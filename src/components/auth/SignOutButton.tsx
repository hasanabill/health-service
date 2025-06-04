"use client";

import { signOut } from "@/auth";

export default function SignOutButton() {
  return (
    <button
      className="hover:bg-red-500 cursor-pointer hover:text-black py-2 px-3 rounded-lg"
      onClick={() => signOut()}
    >
      Sign Out
    </button>
  );
} 