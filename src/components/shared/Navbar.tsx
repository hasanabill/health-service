"use client";

import Link from "next/link";
import React from "react";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
  ];

  return (
    <nav className="flex justify-around items-center bg-teal-600 text-white p-4">
      <h1 className="text-2xl font-bold">Health Service</h1>
      <ul className="flex space-x-4 items-center">
        {links.map((link) => (
          <li key={link.name}>
            <Link
              className="hover:bg-cyan-500 hover:text-black py-2 px-3 rounded-lg"
              href={link.href}
            >
              {link.name}
            </Link>
          </li>
        ))}
        {!session ? (
          <>
            <li>
              <Link
                className="hover:bg-cyan-500 hover:text-black py-2 px-3 rounded-lg"
                href="/auth/signin"
              >
                Sign In
              </Link>
            </li>
            <li>
              <Link
                className="hover:bg-cyan-500 hover:text-black py-2 px-3 rounded-lg"
                href="/auth/signup"
              >
                Sign Up
              </Link>
            </li>
          </>
        ) : (
          <>
            <h1>{session.user?.name}</h1>
            <li>
              <button
                className="hover:bg-red-500 cursor-pointer hover:text-black py-2 px-3 rounded-lg"
                onClick={() => signOut()}
              >
                Sign Out
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
