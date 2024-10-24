"use client";

import { useSocket } from "@/context/SocketContext";
import React from "react";
import { useUser } from "@clerk/nextjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

const ListOnlineUsers = () => {
  const { user } = useUser();
  const { onlineUsers, handleCall } = useSocket();

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 text-center mb-6">
        Online Users
      </h2>
      <div className="space-y-4">
        {onlineUsers && onlineUsers.length > 0 ? (
          onlineUsers.map((onlineUser) => (
            <div
              key={onlineUser.userId}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    src={onlineUser?.profile?.imageUrl || "/default-avatar.png"} // Fallback to default image
                    alt={`${onlineUser?.profile?.fullName || "User"}'s avatar`}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>
                <div className="ml-4">
                  <p className="text-lg font-medium text-gray-700">
                    {onlineUser?.profile?.fullName?.split(" ")[0] || "User"}
                  </p>
                  <div className="flex items-center space-x-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="text-sm text-gray-500">Online</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleCall(onlineUser)}
                className="bg-blue-500 text-white p-2 rounded-3xl hover:bg-blue-600 transition-colors"
                aria-label="Call user"
              >
                <FontAwesomeIcon icon={faPhone} className="w-5 h-5" />
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No users are online right now.
          </p>
        )}
      </div>
    </div>
  );
};

export default ListOnlineUsers;
