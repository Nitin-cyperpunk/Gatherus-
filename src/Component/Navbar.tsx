"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#140E1F" : "#F8F8F8";
  }, [darkMode]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
    { name: "Testimonial", path: "/testimonial" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 mt-4 max-w-180 mx-auto rounded-xl px-3 py-3 flex justify-between items-center transition-colors duration-300 shadow-md ${
        darkMode
          ? "bg-[#140E1F]/70 text-white backdrop-blur-md"
          : "bg-gray-400/60 text-white backdrop-blur-md"
      }`}
    >
      <div className="flex items-center space-x-1">
        <span className="text-2xl font-bold bg-amber-900 rounded-md">⌘</span>
        <h1 className="text-xl font-bold">Gatherus</h1>
      </div>

      <ul className="hidden md:flex space-x-4 font-semibold text-lg ml-3">
        {navLinks.map((link, idx) => (
          <li key={idx}>
            <Link
              href={link.path}
              className={`transition-colors duration-200 ${
                link.name === "Home"
                  ? "text-lime-400"
                  : "hover:text-lime-300"
              }`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center ml-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`w-10 h-5 flex items-center rounded-full p-1 transition-colors duration-300 ${
            darkMode ? "bg-lime-400 justify-end" : "bg-gray-300 justify-start"
          }`}
        >
          <div className="w-4 h-4 bg-white rounded-full shadow-md"></div>
        </button>

        <button
          className="md:hidden focus:outline-none ml-3"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isMobileMenuOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </div>

      {isMobileMenuOpen && (
        <ul
          className={`absolute top-20 left-0 w-full flex flex-col items-center space-y-4 py-6 font-semibold text-lg shadow-lg md:hidden transition-all duration-300 ${
            darkMode
              ? "bg-[#140E1F]/90 text-white"
              : "bg-gray-400/90 text-white"
          }`}
        >
          {navLinks.map((link, idx) => (
            <li key={idx}>
              <Link
                href={link.path}
                className={`transition-colors duration-200 ${
                  link.name === "Home"
                    ? "text-lime-400"
                    : "hover:text-lime-300"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
