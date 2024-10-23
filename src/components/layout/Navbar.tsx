"use client";

import { UserButton } from "@clerk/nextjs";
import Container from "./Container";
import { Video } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/clerk-react";
import { Button } from "../ui/button";

const Navbar = () => {
  const router = useRouter();
  const { userId } = useAuth();

  return (
    <div className="sticky top-0 z-50 bg-white border-b border-b-primary/10">
      <Container>
        <div className="flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-point rounded transition duration-300"
            onClick={() => router.push("/")}
            role="button"
            aria-label="Go to homepage"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && router.push("/")}
          >
            <Video className="w-6 h-6 text-primary" />
            <div className="font-bold text-2xl text-gray-800">CallYours</div>
          </div>
          <div className="gap-2 flex items-center">
            <UserButton />
            {!userId && (
              <>
                <Button
                  size={"default"}
                  variant={"outline"}
                  onClick={() => router.push("/sign-in")}
                >
                  Sign In
                </Button>
                <Button
                  size={"default"}
                  onClick={() => router.push("/sign-up")}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
