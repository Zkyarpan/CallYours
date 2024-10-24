"use client";
import { useSocket } from "@/context/SocketContext";

const CallNotification = () => {
  const { onGoingCall } = useSocket();

  // Ensure the notification shows when there's an incoming call
  if (!onGoingCall?.isRinging) {
    console.log("No incoming call, returning.");
    return null;
  }

  return (
    <div className="absolute bg-slate-500 bg-opacity-70 w-screen h-screen top-0 left-0 flex justify-center items-center">
      <div className="p-5 bg-white rounded shadow-lg">
        <h2>
          Incoming Call from {onGoingCall.participants.caller.profile.fullName}
        </h2>
        <img
          src={onGoingCall.participants.caller.profile.imageUrl}
          alt="Caller"
          className="w-16 h-16 rounded-full mb-2"
        />
        <div className="flex justify-around mt-4">
          <button className="bg-green-500 px-4 py-2 text-white rounded">
            Accept
          </button>
          <button className="bg-red-500 px-4 py-2 text-white rounded">
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default CallNotification;
