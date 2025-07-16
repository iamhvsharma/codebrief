import React from "react";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <div className="grid min-h-[calc(100vh-80px)] grid-cols-1 gap-8 px-4 py-12 sm:px-6 lg:grid-cols-10 lg:items-center lg:gap-16 lg:px-12">
      {/* Left Section */}
      <div className="lg:col-span-4 space-y-6 max-w-2xl mx-auto text-center lg:text-left">
        <h1 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-gray-900">
          Understand Codebases 10x Faster with <span className="text-blue-600 text-5xl">CodeBrief</span>
        </h1>
        <p className="text-base sm:text-lg text-gray-600">
          CodeBrief is your AI onboarding assistant that explains any codebase in seconds.
          Save time, ship faster.
        </p>
        <div>
          <Button className="bg-primary px-6 py-3 text-white rounded-lg hover:bg-gray-800">
            Try CodeBrief Free
          </Button>
        </div>
      </div>

      {/* Right Section */}
      <div className="lg:col-span-6 w-full max-w-4xl mx-auto">
        <div className="relative pb-[56.25%] h-0">
          <iframe
            src="https://www.loom.com/embed/5e7a15ca18ef48a0bab84e857d9b56ce?sid=a0417def-f005-4de4-bcb2-1ea177e94a2e"
            frameBorder="0"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full rounded-lg"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Hero;
