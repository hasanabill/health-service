import Link from "next/link";
import React from "react";

const Navbar = () => {
  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "SignIn", href: "/auth/signin" },
    { name: "SignUp", href: "/auth/signup" },
  ];

  return (
    <nav className="flex justify-around items-center bg-teal-600 text-white p-4">
      <h1 className="text-2xl font-bold">Health Service</h1>
      <ul className="flex space-x-4">
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
      </ul>
    </nav>
  );
};

export default Navbar;
