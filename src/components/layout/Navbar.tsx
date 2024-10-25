"use client";

import { UserButton } from "@clerk/nextjs";
import { Video } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/clerk-react";

const Navbar = () => {
  const router = useRouter();
  const { userId } = useAuth();

  return (
    <div className="sticky top-0 z-50 bg-white border-b border-b-primary/10">
      <div className="max-w-full mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => router.push("/")}
            role="button"
            aria-label="Go to homepage"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && router.push("/")}
          >
            <Video className="w-6 h-6 text-blue-600" />
            <div className="font-bold text-2xl text-gray-800">CallYours</div>
          </div>

          <div className="flex items-center gap-6">
            <Button variant="link" onClick={() => router.push("/features")}>
              Features
            </Button>
          </div>

          <div className="gap-3 flex items-center">
            {userId ? (
              <UserButton />
            ) : (
              <>
                <Button
                  size="default"
                  variant="outline"
                  onClick={() => router.push("/sign-in")}
                >
                  Sign In
                </Button>
                <Button size="default" onClick={() => router.push("/sign-up")}>
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
