"use client";

import { useUser } from "@clerk/nextjs";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
import { Participants, OngoingCall, SocketUser } from "../../types/index";

interface iSocketContext {
  onlineUsers: SocketUser[] | null;
  onGoingCall: OngoingCall | null;
  handleCall: (user: SocketUser) => void;
}

// Context to share the socket instance
const SocketContext = createContext<iSocketContext | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<SocketUser[] | null>(null);
  const [onGoingCall, setOnGoingCall] = useState<OngoingCall | null>(null);

  const currentSocketUser = onlineUsers?.find(
    (user) => user.socketId === socket?.id
  );

  // Function to handle calling a user
  const handleCall = useCallback(
    (user: SocketUser) => {
      if (!currentSocketUser) return;

      if (user.userId === currentSocketUser.userId) {
        console.log("You cannot call yourself!");
        return;
      }

      const participants = { caller: currentSocketUser, receiver: user };
      setOnGoingCall({ participants, isRinging: false });

      // Emit a 'call' event with participants info
      socket?.emit("call", participants);
    },
    [socket, currentSocketUser]
  );

  // Function to handle incoming calls
  const onIncomingCall = useCallback(
    (participants: Participants) => {
      if (participants.receiver.userId === user?.id) {
        setOnGoingCall({ participants, isRinging: true });
      }
    },
    [user]
  );

  // Initialize socket connection when the user is logged in
  useEffect(() => {
    if (!user) return; // Only initialize if user exists

    // Create a new socket connection
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);

    // Clean up socket connection when the component unmounts or user logs out
    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  // Handle socket connection and disconnection events
  useEffect(() => {
    if (!socket) return;

    const handleConnect = () => setIsConnected(true);
    const handleDisconnect = () => setIsConnected(false);

    // Listen for socket connect/disconnect events
    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);

    // Clean up listeners when the component unmounts or socket changes
    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
    };
  }, [socket]);

  // Set and update online users based on socket events
  useEffect(() => {
    if (!socket || !isConnected) return;

    // Emit an event to add the current user to the online users list
    socket.emit("addNewUser", user);

    // Listen for updates to the online users list
    socket.on("getUser", (users: SocketUser[]) => {
      setOnlineUsers(users);
    });

    // Clean up the "getUser" event listener when component unmounts or socket changes
    return () => {
      socket.off("getUser");
    };
  }, [socket, isConnected, user]);

  // Listen for incoming call events
  useEffect(() => {
    if (!socket || !isConnected || !user) return;

    socket.on("incomingCall", onIncomingCall);
    console.log("Listening for incoming calls");

    // Clean up the event listener on unmount or when dependencies change
    return () => {
      socket.off("incomingCall", onIncomingCall);
    };
  }, [socket, isConnected, user, onIncomingCall]);

  return (
    <SocketContext.Provider value={{ onlineUsers, onGoingCall, handleCall }}>
      {children}
    </SocketContext.Provider>
  );
};

// Custom hook to access the socket instance and context
export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider.");
  }
  return context;
};
