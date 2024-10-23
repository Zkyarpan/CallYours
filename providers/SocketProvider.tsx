"use client";

import React from "react";
import { SocketProvider } from "@/context/SocketContext";

const AppSocketProvider = ({ children }: { children: React.ReactNode }) => {
  return <SocketProvider>{children}</SocketProvider>;
};

export default AppSocketProvider;
