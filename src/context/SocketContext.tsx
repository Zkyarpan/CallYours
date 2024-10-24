"use client";

import { useUser } from "@clerk/nextjs";
import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { SocketUser } from "../../types";

// Context to share the socket instance
const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<SocketUser[] | null>(null);

  console.log("Current online users:", onlineUsers);

  // Initialize socket connection when the user is logged in
  useEffect(() => {
    if (!user) return; // Only initialize if user exists

    // Create a new socket connection when the user logs in
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
