"use client";

import { Video, Users, PhoneCall, Shield } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/clerk-react";

const HeroSection = () => {
  const router = useRouter();
  const { userId } = useAuth();

  const features = [
    {
      icon: Users,
      title: "Connect Instantly",
      description: "Join with friends and colleagues in real-time video calls",
    },
    {
      icon: PhoneCall,
      title: "Crystal Clear Calls",
      description: "Experience high-quality video and audio conversations",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your calls are protected with end-to-end encryption",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Hero Content */}
        <div className="pt-20 pb-16 text-center lg:pt-32 lg:pb-24">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 flex justify-center">
              <div className="relative rounded-full px-4 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                New Features Available!{" "}
                <a href="#" className="font-semibold text-blue-600">
                  <span className="absolute inset-0" aria-hidden="true" />
                  Learn more <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Video Calls Made <span className="text-blue-600">Simple</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Connect with anyone, anywhere in the world with just one click.
              Experience crystal-clear video calls without any complicated
              setup.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              {!userId && (
                <>
                  <Button
                    size="lg"
                    onClick={() => router.push("/sign-up")}
                    className="text-base"
                  >
                    Get Started Free
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => router.push("/sign-in")}
                    className="text-base"
                  >
                    Learn More
                  </Button>
                </>
              )}
              {userId && (
                <Button
                  size="lg"
                  onClick={() => router.push("/calls")}
                  className="text-base"
                >
                  Start a Call
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-20">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:border-blue-100 hover:shadow-md transition-all duration-200"
                  >
                    <div className="mb-4">
                      <div className="inline-flex items-center justify-center rounded-lg bg-blue-50 p-3">
                        <Icon className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
