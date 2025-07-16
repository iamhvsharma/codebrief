import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="bg-yellow-metal-100 mt-auto py-4 text-gray-900 border-t-1 border-t-blue-200">
        <div className="container mx-auto text-center">
          <p className="mt-2 text-sm font-semibold">
            Made with ❤️ by Harshvardhan Sharma, Github:{" "}
            <Link
              href="https://github.com/iamhvsharma/codebrief"
              className="hover:text-primary transition-colors"
            >
              @iamhvsharma
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
