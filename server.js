import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import onCall from "./socket-events/onCall.js";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

export let io;

app.prepare().then(() => {
  const httpServer = createServer(handler);

  // Initialize Socket.IO server with CORS setup
  io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:3000", // Allow frontend to connect
      methods: ["GET", "POST"],
    },
  });

  // Array to store online users' information
  let onlineUsers = [];

  io.on("connection", (socket) => {
    console.log("A user connected with socket id:", socket.id);

    // When a new user logs in, add them to the onlineUsers array
    socket.on("addNewUser", (clerkUser) => {
      // Check if the user exists and is not already in the onlineUsers list
      if (
        clerkUser &&
        !onlineUsers.some((user) => user.userId === clerkUser.id)
      ) {
        // Add the new user with their userId, socketId, and profile info
        onlineUsers.push({
          userId: clerkUser.id,
          socketId: socket.id,
          profile: {
            fullName: clerkUser.fullName,
            imageUrl: clerkUser.imageUrl,
          },
        });
      }

      // Emit the updated list of online users to all clients
      io.emit("getUser", onlineUsers);
    });

    // Handle user disconnection
    socket.on("disconnect", () => {
      console.log("User disconnected with socket id:", socket.id);

      // Remove the user from the onlineUsers list based on their socketId
      onlineUsers = onlineUsers.filter((user) => user.socketId === socket.id);

      // Emit the updated list of online users to all clients
      io.emit("getUser", onlineUsers);
    });

    // Call Events
    socket.on("call", onCall);
  });

  // Start the server and listen on the specified port
  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
