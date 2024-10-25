"use client";
import React from "react";
import { useSocket } from "@/context/SocketContext";
import { Phone, PhoneOff, User2 } from "lucide-react";

const CallNotification = () => {
  const { onGoingCall } = useSocket();

  if (!onGoingCall?.isRinging) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-300">
      <div className="bg-white rounded-xl shadow-2xl w-80 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white text-center">
          <h2 className="text-lg font-semibold">Incoming Call</h2>
        </div>

        <div className="p-6 flex flex-col items-center">
          <div className="relative">
            {onGoingCall.participants.caller.profile.imageUrl ? (
              <img
                src={onGoingCall.participants.caller.profile.imageUrl}
                alt="Caller"
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg animate-bounce"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center animate-bounce">
                <User2 className="w-12 h-12 text-blue-600" />
              </div>
            )}
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white" />
          </div>

          <h3 className="mt-4 text-xl font-semibold text-gray-800">
            {onGoingCall.participants.caller.profile.fullName}
          </h3>
          <p className="text-gray-500 mt-1">is calling you...</p>
        </div>

        <div className="flex justify-center gap-6 p-6 bg-gray-50">
          <button className="group flex flex-col items-center">
            <div className="w-14 h-14 bg-red-500 rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors duration-200">
              <PhoneOff className="w-6 h-6 text-white" />
            </div>
            <span className="mt-2 text-sm text-gray-600 group-hover:text-red-600">
              Decline
            </span>
          </button>

          <button className="group flex flex-col items-center">
            <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors duration-200">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <span className="mt-2 text-sm text-gray-600 group-hover:text-green-600">
              Accept
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CallNotification;
