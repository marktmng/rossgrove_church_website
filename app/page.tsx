"use client";

import { Viewer } from "@photo-sphere-viewer/core";
import "@photo-sphere-viewer/core/index.css";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function HomePage() {
  const [open, setOpen] = useState(false);
  const viewerRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (open && containerRef.current) {
      viewerRef.current = new Viewer({
        container: containerRef.current,
        panorama: "/assets/loan-360.jpg", // ✅ fixed here
        navbar: ["zoom", "fullscreen"],
      });
    }

    return () => {
      if (viewerRef.current) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }
    };
  }, [open]);

  return (
    <div className="flex flex-col">

      {/* HERO SECTION */}
      <section
        className="relative h-[85vh] flex items-center justify-center text-white bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/banner.jpg')" }}
      >
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black/80 to-transparent" />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative max-w-3xl mx-auto text-center px-6 pt-24">
          <h1 className="text-4xl md:text-5xl font-semibold mb-6">
            Welcome to Rossgrove Bible Chapel
          </h1>
          <p className="text-lg md:text-xl text-neutral-200 mb-8">
            A Bible-believing church in Mt Albert, Auckland,
            growing together in faith and truth.
          </p>
          <Link
            href="/contact"
            className="bg-[#82CEC7] hover:bg-[#82CEC7]/80 px-6 py-3 rounded-md font-medium transition"
          >
            Plan Your Visit
          </Link>
        </div>
      </section>

      {/* SERVICE INFO */}
      <section className="py-20 px-6 bg-white text-center">
        <h2 className="text-3xl font-semibold mb-6">
          Join Us This Sunday
        </h2>
        <p className="text-lg mb-2">Sunday Worship – 10:00 AM</p>
        <p className="text-neutral-600">
          12 Rossgrove Terrace, Mt Albert, Auckland
        </p>
      </section>

      {/* 360 VIEW SECTION */}
      <section >
        {/* <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center"> */}

          {/* LEFT TEXT */}
          {/* <div>
            <h2 className="text-3xl md:text-4xl font-semibold mb-6">
              Take a Virtual Tour
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Explore Rossgrove Bible Chapel through an interactive 360° experience.
              Click below to look around the space.
            </p>
            <button
              onClick={() => setOpen(true)}
              className="bg-[#82CEC7] hover:bg-[#82CEC7]/80 px-6 py-3 rounded-md font-medium transition"
            >
              Start Virtual Tour
            </button>
          </div> */}

          {/* RIGHT PREVIEW */}
          {/* <div
            className="relative cursor-pointer group"
            onClick={() => setOpen(true)}
          >
            <img
              src="/assets/loan-360.jpg" // ✅ same file as viewer
              alt="360 Preview"
              className="rounded-lg shadow-lg transition duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-black/60 text-white px-6 py-3 rounded-full text-lg">
                360° View
              </div>
            </div>
          </div> */}

        {/* </div> */}
      </section>

      {/* LOCATION */}
      <section className="py-20 px-6 text-gray-600 bg-gray-50 text-center">
        <h2 className="text-3xl font-semibold mb-7">
          Find Us Here
        </h2>

        <div className="mx-auto overflow-hidden">
          <iframe
            title="Rossgrove Bible Chapel Location"
            src="https://www.google.com/maps?q=12+Rossgrove+Terrace,+Mt+Albert,+Auckland&output=embed"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="mt-6">
          <a
            href="https://maps.app.goo.gl/vzvTWDE5pTWKqu5r5"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#82CEC7] hover:bg-[#82CEC7]/80 px-6 py-3 rounded-md font-medium transition"
          >
            Open in Google Maps
          </a>
        </div>
      </section>

      {/* MODAL 360 VIEWER */}
      {/* {open && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="relative w-[95%] md:w-[80%] h-[80vh] bg-black rounded-lg overflow-hidden">

            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-[#E94B26] px-4 py-2 rounded-md z-10"
            >
              [ x ]
            </button>

            <div ref={containerRef} className="w-full h-full" />

          </div>
        </div>
      )} */}

    </div>
  );
}