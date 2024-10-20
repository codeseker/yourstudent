"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";

function TeacherSidebar() {
  const handleSignOut = async () => {
    try {
      await signOut({ redirect: true, callbackUrl: "/" });
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };
  return (
    <aside
      className={`bg-card h-full rounded w-full md:w-64 p-4 absolute sm:relative transition-transform transform ${
        false ? "translate-x-0" : "-translate-x-full"
      } sm:translate-x-0`}
    >
      <div className="text-2xl font-semibold mb-6">Teacher Dashboard</div>
      <nav className="flex flex-col justify-betweenl ">
        <ul>
          <li className="p-4 hover:bg-accent rounded">
            <Link href="/teacher/dashboard">Dashboard</Link>
          </li>
          <li className="p-4 hover:bg-accent rounded">
            <Link href="/teacher/student/assignment">Assignment Marks</Link>
          </li>
        </ul>
        <button
          onClick={handleSignOut}
          className="w-full flex items-start p-4 hover:bg-accent"
        >
          Sign Out
        </button>
      </nav>
    </aside>
  );
}

export default TeacherSidebar;
