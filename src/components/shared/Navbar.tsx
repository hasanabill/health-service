import Link from "next/link";
import { auth } from "@/auth";
import SignOutButton from "../auth/SignOutButton";

const Navbar = async () => {
  const session = await auth();

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
          <li>
            <SignOutButton />
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
