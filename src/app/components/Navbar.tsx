"use client";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import { LogOut, RectangleEllipsis } from "lucide-react";
import { useRouter } from "next/navigation";

const Header: React.FC = () => {
  const router = useRouter();
  const session = useSession();
  const handleSignOut = async () => {
    try {
      await signOut({ redirect: true, callbackUrl: "/" });
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };
  return (
    <header className="text-gray-600 body-font shadow-lg sticky top-0 z-50 bg-white">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl">YourStudent</span>
        </a>

        <div>
          <Button
            onClick={() => {
              if (
                session.data?.user?.email ===
                process.env.NEXT_PUBLIC_HOD_SIR_EMAIL
              ) {
                router.push("/admin/dashboard");
              } else {
                router.push("/teacher/dashboard");
              }
            }}
            className="mx-4 inline-flex items-center justify-center gap-2 py-2 px-4 text-white rounded-lg shadow-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 text-sm md:text-base mt-4 md:mt-0"
          >
            Dashboard
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
