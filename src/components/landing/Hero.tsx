import React from "react";
import { Button } from "../ui/button";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="grid min-h-[calc(100vh-80px)] grid-cols-1 gap-8 px-4 py-12 sm:px-6 lg:grid-cols-10 lg:items-center lg:gap-16 lg:px-12">
      {/* Left Section */}
      <div className="mx-auto max-w-2xl space-y-6 text-center lg:col-span-4 lg:text-left">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-4xl">
          Understand Codebases 10x Faster with{" "}
          <span className="text-5xl text-blue-600">CodeBrief</span>
        </h1>
        <p className="text-base text-gray-600 sm:text-lg">
          CodeBrief is your AI onboarding assistant that explains any codebase
          in seconds. Save time, ship faster.
        </p>
        <div>
          <SignedOut>
            <Link href="/sign-up">
            <Button className="bg-primary rounded-lg px-6 py-3 text-white hover:bg-gray-800">
              Try CodeBrief Free
            </Button>
            </Link>
          </SignedOut>

          <SignedIn>
            <Link href="/dashboard">
              <Button className="bg-primary rounded-lg px-6 py-3 text-white hover:bg-gray-800">
                Visit Dashboard
              </Button>
            </Link>
          </SignedIn>
        </div>
      </div>

      {/* Right Section */}
      <div className="mx-auto w-full max-w-4xl lg:col-span-6">
        <div className="relative h-0 pb-[56.25%]">
          <iframe
            src="https://www.loom.com/embed/5e7a15ca18ef48a0bab84e857d9b56ce?sid=a0417def-f005-4de4-bcb2-1ea177e94a2e"
            frameBorder="0"
            allowFullScreen
            className="absolute top-0 left-0 h-full w-full rounded-lg"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Hero;
