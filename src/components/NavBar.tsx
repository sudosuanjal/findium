"use client";

import React from "react";
import Link from "next/link";
import { NAVBAR_HEIGHT } from "@/lib/constants";
import { signOut } from "aws-amplify/auth";
import { useGetAuthUserQuery } from "@/state/api";
import { usePathname, useRouter } from "next/navigation";
import { SidebarTrigger } from "./ui/sidebar";
import { Button } from "./ui/button";
import { Bell, MessageCircle, Plus, Search } from "lucide-react";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const NavBar = () => {
  const { data: authUser } = useGetAuthUserQuery();
  const router = useRouter();
  const pathname = usePathname();

  const isDashboardPage =
    pathname.includes("/tenants") || pathname.includes("/managers");

  const handleSignout = async () => {
    await signOut();
    window.location.href = "/";
  };
  return (
    <div
      className="fixed top-0 left-0 w-full z-50 shadow-xl"
      style={{ height: `${NAVBAR_HEIGHT}px` }}
    >
      <div className="flex justify-between items-center w-full py-3 px-8 bg-primary-700 text-white">
        <div className="flex items-center gap-4 md:gap-6">
          {isDashboardPage && (
            <div className="md:hidden">
              <SidebarTrigger />
            </div>
          )}
          <Link href="/" className="hover:!text-primary-300" scroll={false}>
            <div className="flex items-center gap-3">
              <div className="text-xl font-bold">FINDIUM</div>
            </div>
          </Link>

          {isDashboardPage && authUser && (
            <>
              ellwo
              <Button
                className="md:ml-4 bg-primary-50 text-primary-700 hover:bg-secondary-500 hover:text-primary-50"
                onClick={() => {
                  router.push(
                    authUser.userRole?.toLowercase() === "manager"
                      ? "/managers/newproperty"
                      : "/search"
                  );
                }}
              >
                {authUser.userRole?.toLowerCase() === "manager" ? (
                  <>
                    <Plus className="h-4 w-4" />
                    <span className="hidden md:block ml-2">
                      Add New Property
                    </span>
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4" />
                    <span className="hidden md:block ml-2">
                      Search Properties
                    </span>
                  </>
                )}
              </Button>
            </>
          )}
        </div>

        {!isDashboardPage && (
          <p className="text-primary-200 hidden md:block">
            Discover your perfect rental apartment with our advanced search
          </p>
        )}

        {/* Right section - buttons (design-only placeholders) */}
        <div className="flex items-center gap-5">
          {authUser ? (
            <>
              <div className="relative hidden md:block">
                <MessageCircle className="w-6 h-6 cursor-pointer text-primary-200 hover:text-primary-400" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-secondary-700 rounded-full"></span>
              </div>
              <div className="relative hidden md:block">
                <Bell className="w-6 h-6 cursor-pointer text-primary-200 hover:text-primary-400" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-secondary-700 rounded-full"></span>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 focus:outline-none">
                  <Avatar>
                    <AvatarImage src={authUser.userInfo?.image} />
                    <AvatarFallback className="bg-primary-600">
                      {authUser.userRole?.[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-primary-200 hidden md:block">
                    {authUser.userInfo?.name}
                  </p>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white text-primary-700">
                  <DropdownMenuItem
                    className="cursor-pointer hover:!bg-primary-700 hover:!text-primary-100 font-bold"
                    onClick={() =>
                      router.push(
                        authUser.userRole?.toLowerCase() === "manager"
                          ? "/managers/properties"
                          : "/tenants/favorites",
                        { scroll: false }
                      )
                    }
                  >
                    Go to Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-primary-200" />
                  <DropdownMenuItem
                    className="cursor-pointer hover:!bg-primary-700 hover:!text-primary-100"
                    onClick={() =>
                      router.push(
                        `/${authUser.userRole?.toLowerCase()}s/settings`,
                        { scroll: false }
                      )
                    }
                  >
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer hover:!bg-primary-700 hover:!text-primary-100"
                    onClick={handleSignout}
                  >
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
