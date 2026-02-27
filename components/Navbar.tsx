"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

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

        {/* ========== DESKTOP VERSION ========== */}
        <div className="hidden md:block">
          <div
            className={`flex items-center border rounded-md overflow-hidden transition-[width] duration-500 ease-out ${
              open ? "w-[420px]" : "w-[100px]"
            }`}
          >
            {!open && (
              <button
                onClick={() => setOpen(true)}
                className="w-full px-4 py-2 font-medium bg-[#9FCC4B] hover:bg-[#9FCC4B]/80 text-white"
              >
                Menu
              </button>
            )}

            {open && (
              <div className="flex items-center justify-between w-full px-4 py-2 font-medium space-x-6 bg-[#9FCC4B] text-white">
                <Link href="/about" onClick={() => setOpen(false)}>
                  About
                </Link>
                <Link href="/services" onClick={() => setOpen(false)}>
                  Services
                </Link>
                <Link href="/sermons" onClick={() => setOpen(false)}>
                  Sermons
                </Link>
                <Link href="/contact" onClick={() => setOpen(false)}>
                  Contact
                </Link>

                <button
                  onClick={() => setOpen(false)}
                  className="hover:text-[#EDA235] transition-colors duration-300"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ========== MOBILE VERSION ========== */}
        <div className="relative md:hidden">
          <button
            onClick={() => setOpen(!open)}
            className="px-4 py-2 font-medium bg-[#9FCC4B] hover:bg-[#9FCC4B]/80 text-white rounded-md"
          >
            Menu
          </button>

          <div
            className={`absolute right-0 mt-2 w-48 bg-[#9FCC4B] text-white rounded-md shadow-lg transition-all duration-300 ease-out ${
              open
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
          >
            <div className="flex flex-col p-4 space-y-7 font-medium">
              <Link href="/about" onClick={() => setOpen(false)}>
                About
              </Link>
              <Link href="/services" onClick={() => setOpen(false)}>
                Services
              </Link>
              <Link href="/sermons" onClick={() => setOpen(false)}>
                Sermons
              </Link>
              <Link href="/contact" onClick={() => setOpen(false)}>
                Contact
              </Link>
            </div>
          </div>
        </div>

      </div>
    </nav>
  );
}