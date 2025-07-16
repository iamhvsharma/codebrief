"use client";

import Link from "next/link";
import { useState } from "react";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, UserProfile } from "@clerk/nextjs";
import Image from "next/image";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center text-2xl font-extrabold text-gray-900"
          >
            <Image src="/logo.svg" alt="logo" width={60} height={60} />
          </Link>

          {/* Desktop Buttons */}
          <div className="hidden items-center space-x-4 md:flex">
            <SignedOut>
              <SignUpButton mode="modal">
                <button className="rounded-lg px-5 py-2 text-sm font-semibold text-gray-800 transition hover:bg-gray-100">
                  Join Now
                </button>
              </SignUpButton>
              <SignInButton mode="modal">
                <button className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">
                  Signin
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 hover:text-black focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="mt-4 space-y-2 border-t pt-4 pb-6 md:hidden">
            <SignUpButton mode="modal">
              <button className="w-full rounded-lg px-4 py-2 text-left font-semibold text-gray-800 transition hover:bg-gray-100">
                Join Now
              </button>
            </SignUpButton>
            <SignInButton mode="modal">
              <button className="w-full rounded-lg bg-blue-600 px-4 py-2 text-left font-semibold text-white transition hover:bg-blue-700">
                Signin
              </button>
            </SignInButton>
          </div>
        )}
      </div>
    </nav>
  );
}
