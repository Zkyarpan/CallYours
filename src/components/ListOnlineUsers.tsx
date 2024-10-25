"use client";

import { useSocket } from "@/context/SocketContext";
import { useUser } from "@clerk/nextjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faSearch } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";

const ListOnlineUsers = () => {
  const { user } = useUser();
  const { onlineUsers, handleCall } = useSocket();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = onlineUsers?.filter((user) =>
    user?.profile?.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-md mx-auto h-[calc(100vh-2rem)] mt-4 bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-700">
        <h2 className="text-xl font-semibold text-white mb-3">
          Active Contacts
        </h2>

        <div className="relative">
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 bg-blue-700/30 text-white placeholder-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-200"
          />
        </div>
      </div>

      <div className="overflow-y-auto h-[calc(100%-7.5rem)] p-4 space-y-2">
        {filteredUsers && filteredUsers.length > 0 ? (
          filteredUsers.map((onlineUser) => {
            const isCurrentUser = onlineUser.userId === user?.id;
            const firstName =
              onlineUser?.profile?.fullName?.split(" ")[0] || "User";

            return (
              <div
                key={onlineUser.userId}
                className={`
                  group flex items-center p-3 rounded-xl transition-all duration-200
                  ${
                    isCurrentUser
                      ? "bg-blue-50 border-2 border-blue-100"
                      : "hover:bg-gray-50"
                  }
                `}
              >
                <div className="flex items-center flex-1">
                  <div className="relative">
                    <img
                      src={
                        onlineUser?.profile?.imageUrl || "/default-avatar.png"
                      }
                      alt={`${
                        onlineUser?.profile?.fullName || "User"
                      }'s avatar`}
                      className={`w-12 h-12 rounded-full object-cover shadow-sm
                        ${
                          isCurrentUser
                            ? "border-3 border-blue-200"
                            : "border-2 border-white"
                        }
                      `}
                    />
                    <div className="absolute bottom-0 right-0 transform translate-x-1">
                      <span className="relative flex h-3.5 w-3.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-green-500 border-2 border-white"></span>
                      </span>
                    </div>
                  </div>

                  <div className="ml-4 flex-1">
                    <div className="flex items-center">
                      <p
                        className={`font-medium ${
                          isCurrentUser ? "text-blue-700" : "text-gray-900"
                        }`}
                      >
                        {firstName}
                        {isCurrentUser && (
                          <span className="ml-2 text-sm font-bold text-blue-500">
                            (You)
                          </span>
                        )}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500">Active now</p>
                  </div>
                </div>

                {!isCurrentUser && (
                  <button
                    onClick={() => handleCall(onlineUser)}
                    className="transform transition-all duration-200 p-3 rounded-full
                      bg-blue-50 hover:bg-blue-100 group-hover:scale-110"
                    aria-label={`Call ${firstName}`}
                  >
                    <FontAwesomeIcon
                      icon={faPhone}
                      className="w-4 h-4 text-blue-600"
                    />
                  </button>
                )}
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FontAwesomeIcon
                icon={faSearch}
                className="w-8 h-8 text-gray-400"
              />
            </div>
            <p className="font-medium">No contacts found</p>
            <p className="text-sm">
              {searchTerm
                ? "Try a different search term"
                : "No users are online right now"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListOnlineUsers;
