"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useAuth from "@/hooks/useAuth";

export default function Navbar() {
  const { role, loading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  if (loading) return null;

  const links = [
    { name: "Home", href: "/" },
    ...(role === "patient"
      ? [
          { name: "Calculators", href: "/dashboard/patient/calculators" },
          {
            name: "Symptom Checker",
            href: "/dashboard/patient/symptom-checker",
          },
          { name: "Appointments", href: "/dashboard/patient/appointments" },
        ]
      : []),
    ...(role === "doctor"
      ? [
          { name: "Patient List", href: "/dashboard/doctor/patient-list" },
          { name: "Schedule", href: "/dashboard/doctor/schedule" },
        ]
      : []),
    ...(role === "admin"
      ? [
          { name: "Manage Users", href: "/dashboard/admin/manage-users" },
          { name: "Reports", href: "/dashboard/admin/reports" },
        ]
      : []),
    { name: "Login", href: "/login" },
  ];

  return (
    <nav className="bg-white shadow-md fixed w-full z-20 top-0 left-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            href={links[0].href}
            className="text-xl font-bold text-blue-600"
          >
            Medi Tools
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6 items-center">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`hover:text-blue-500 transition duration-200 ${
                  pathname === link.href
                    ? "text-blue-600 font-semibold"
                    : "text-gray-700"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden flex flex-col gap-1"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div
              className={`w-6 h-0.5 bg-black transition-all duration-300 ${
                isOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <div
              className={`w-6 h-0.5 bg-black transition-all duration-300 ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <div
              className={`w-6 h-0.5 bg-black transition-all duration-300 ${
                isOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md animate-slide-down">
          <div className="px-4 py-2 space-y-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block py-2 text-sm ${
                  pathname === link.href
                    ? "text-blue-600 font-semibold"
                    : "text-gray-700"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
