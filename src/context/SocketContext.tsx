import { useUser } from "@clerk/nextjs";
import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

// Context to share the socket instance
const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser(); // Destructure to get the user
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  console.log("SocketConnected!!", isConnected);

  // Initialize socket connection when the user is logged in
  useEffect(() => {
    if (!user) return; // Only initialize if user exists

    const newSocket = io("http://localhost:3000");

    setSocket(newSocket);

    return () => {
      newSocket.disconnect(); // Clean up when component unmounts
    };
  }, [user]);

  // Handle socket connection and disconnection events
  useEffect(() => {
    if (!socket) return;

    const handleConnect = () => setIsConnected(true);
    const handleDisconnect = () => setIsConnected(false);

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);

    // Clean up listeners when the component unmounts or socket changes
    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

// Custom hook to access the socket instance
export const useSocket = () => {
  const socket = useContext(SocketContext);
  if (!socket) {
    throw new Error("useSocket must be used within a SocketProvider.");
  }
  return socket;
};
