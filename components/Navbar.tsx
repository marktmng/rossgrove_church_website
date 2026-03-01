"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();

  const isLoggedIn = !!session;

  // Prevent UI flicker while session is loading
  if (status === "loading") return null;

  const publicLinks = [
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/sermons", label: "Sermons" },
    { href: "/contact", label: "Contact" },
    { href: "/calendar", label: "Calendar" },
  ];

  const adminLinks = [
    { href: "/tasks", label: "Tasks" },
    { href: "/events", label: "Events" },
  ];

  const linksToRender = isLoggedIn ? adminLinks : publicLinks;

  return (
    <nav className="sticky top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-7 py-7 flex justify-between items-center">

        {/* Logo */}
        <Link href="/">
          <Image
            src="/assets/rossgrove_logo.png"
            alt="Rossgrove Logo"
            width={160}
            height={50}
            priority
          />
        </Link>

        {/* ================= DESKTOP ================= */}
        <div className="hidden md:block">
          <div
            className={`flex items-center rounded-md overflow-hidden transition-[width] duration-500 ease-out ${
              open ? "w-[400px]" : "w-[100px]"
            }`}
          >
            {!open && (
              <button
                onClick={() => setOpen(true)}
                className="w-full px-4 py-2 font-medium text-white hover:text-[#82CEC7] transition-colors duration-300"
              >
                Menu
              </button>
            )}

            {open && (
              <div className="flex items-center justify-between w-full px-4 py-2 font-medium space-x-6 text-white">

                {linksToRender.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="hover:text-[#82CEC7] transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                ))}

                {isLoggedIn && (
                  <button
                    onClick={() => {
                      signOut();
                      setOpen(false);
                    }}
                    className="bg-[#82CEC7] hover:bg-[#82CEC7]/80 px-4 py-2 rounded-md transition-colors duration-300"
                  >
                    Logout
                  </button>
                )}

                <button
                  onClick={() => setOpen(false)}
                  className="hover:text-[#E94B26] transition-colors duration-300"
                >
                  ✕
                </button>

              </div>
            )}
          </div>
        </div>

        {/* ================= MOBILE ================= */}
        <div className="relative md:hidden">
          <button
            onClick={() => setOpen(!open)}
            className="px-4 py-2 font-medium text-white hover:text-[#82CEC7] transition-colors duration-300"
          >
            Menu
          </button>

          <div
            className={`absolute right-0 mt-2 w-48 text-white rounded-md shadow-lg transition-all duration-300 ease-out ${
              open
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
          >
            <div className="flex flex-col p-4 space-y-6 font-medium">

              {linksToRender.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="hover:text-[#82CEC7] transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}

              {isLoggedIn && (
                <button
                  onClick={() => {
                    signOut();
                    setOpen(false);
                  }}
                  className="hover:text-[#E94B26] transition-colors duration-300 text-left"
                >
                  Logout
                </button>
              )}

            </div>
          </div>
        </div>

      </div>
    </nav>
  );
}