"use client";
import { signOut } from "next-auth/react";
import React from "react";

function Sidebar() {
  const handleSignOut = async () => {
    try {
      await signOut({ redirect: true, callbackUrl: "/" });
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };
  return (
    <aside
      className={`bg-card rounded w-full md:w-64 p-4 absolute sm:relative transition-transform transform ${
        false ? "translate-x-0" : "-translate-x-full"
      } sm:translate-x-0`}
    >
      <div className="text-2xl font-semibold mb-6">Admin Panel</div>
      <nav className="flex flex-col justify-between ">
        <ul>
          <li className="p-4 hover:bg-accent rounded">
            <a href="#">Dashboard</a>
          </li>
          <li className="p-4 hover:bg-accent rounded">
            <a href="#">Class List</a>
          </li>
          <li className="p-4 hover:bg-accent rounded">
            <a href="#">Teacher List</a>
          </li>
          <li className="p-4 hover:bg-accent rounded">
            <a href="#">Student List</a>
          </li>
          <li className="p-4 hover:bg-accent rounded">
            <a href="#">Transactions</a>
          </li>
        </ul>
        <button
          onClick={() => handleSignOut()}
          className="w-full flex items-start p-4 hover:bg-accent"
        >
          Sign Out
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;
