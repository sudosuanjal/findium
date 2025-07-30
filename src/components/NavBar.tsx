"use client";

import React from "react";
import Link from "next/link";
import { NAVBAR_HEIGHT } from "@/lib/constants";

const NavBar = () => {
  return (
    <div
      className="fixed top-0 left-0 w-full z-50 shadow-xl"
      style={{ height: `${NAVBAR_HEIGHT}px` }}
    >
      <div className="flex justify-between items-center w-full py-3 px-8 bg-primary-700 text-white">
        {/* Logo Section */}
        <div className="flex items-center gap-4 md:gap-6">
          <Link href="/" className="hover:!text-primary-300" scroll={false}>
            <div className="flex items-center gap-3">
              <div className="text-xl font-bold">FINDIUM</div>
            </div>
          </Link>
        </div>

        {/* Center text - tagline (optional) */}
        <p className="text-primary-200 hidden md:block">
          Discover your perfect rental apartment
        </p>

        {/* Right section - buttons (design-only placeholders) */}
        <div className="flex items-center gap-5">
          <Link href="/signin">
            <div className="border border-white px-4 py-1 rounded-lg text-white hover:bg-white hover:text-primary-700 cursor-pointer">
              Sign In
            </div>
          </Link>
          <Link href="/signup">
            <div className="bg-secondary-600 px-4 py-1 rounded-lg text-white hover:bg-white hover:text-primary-700 cursor-pointer">
              Sign Up
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
