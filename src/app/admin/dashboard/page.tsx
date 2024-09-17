"use client";
import { signOut } from "next-auth/react";
import React from "react";

function AdminDashboard() {
  const handleSignOut = async () => {
    try {
      await signOut({ redirect: true, callbackUrl: "/" });
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };

  return (
    <div>
      <button className="bg-white text-black w-24" onClick={handleSignOut}>
        Logout
      </button>
    </div>
  );
}

export default AdminDashboard;
