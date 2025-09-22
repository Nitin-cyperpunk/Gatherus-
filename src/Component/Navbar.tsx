'use client'
import React, { useState, useEffect } from "react";
import SignupModal from "./Login/SignOutModal";
import SigninModal from "./Login/SignupModal";

function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isSigninOpen, setIsSigninOpen] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#140E1F" : "#F8F8F8";
  }, [darkMode]);

  const primaryBlue = "#5C3CFF";

  return (
    <nav
      className={`w-full rounded-xl px-2 md:px-2 py-3 flex justify-between items-center transition-colors duration-300 ${
        darkMode ? "bg-[#140E1F] text-white" : "bg-white text-gray-800"
      } shadow-md`}
    >
      {/* Logo */}
      <div className="flex flex-col">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-500">Gatherus</h1>
        <p className="text-sm font-light text-blue-400 hidden md:block">
          Promote events in one click
        </p>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-6 font-semibold text-lg">
        {["Home", "About", "Services", "Contact"].map((item) => (
          <li
            key={item}
            className="hover:text-blue-500 cursor-pointer transition-colors duration-200"
          >
            {item}
          </li>
        ))}
      </ul>

      {/* Right side buttons */}
      <div className="flex items-center space-x-3">
        {/* Dark/Light Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`w-10 h-5 flex items-center rounded-full p-1 transition-colors duration-300 ${
            darkMode ? "bg-blue-500 justify-end" : "bg-gray-400 justify-start"
          }`}
        >
          <div className="w-4 h-4 bg-white rounded-full shadow-md"></div>
        </button>

        {/* Sign In / Sign Up Buttons */}
        <button
          className="bg-[#5C3CFF] px-4 py-2 rounded-full font-semibold text-white hover:bg-[#7B5FFF] transition-colors duration-200 hidden md:block"
          onClick={() => setIsSignupOpen(true)}
        >
          Sign Up
        </button>
        <button
          className="bg-transparent border border-[#5C3CFF] px-4 py-2 rounded-full font-semibold text-[#5C3CFF] hover:bg-[#5C3CFF] hover:text-white transition-colors duration-200 hidden md:block"
          onClick={() => setIsSigninOpen(true)}
        >
          Sign In
        </button>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            className="w-6 h-6"
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

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <ul
          className={` z-20 absolute top-16 left-0 w-full bg-${
            darkMode ? "[#140E1F]" : "white"
          } flex flex-col items-center space-y-4 py-4 md:hidden shadow-lg transition-all duration-300`}
        >
          {["Home", "About", "Services", "Contact"].map((item) => (
            <li
              key={item}
              className="hover:text-blue-500 cursor-pointer text-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item}
            </li>
          ))}
          <button
            className="bg-[#5C3CFF] px-6 py-2 rounded-full font-semibold text-white hover:bg-[#7B5FFF] transition-colors duration-200"
            onClick={() => setIsSignupOpen(true)}
          >
            Sign Up
          </button>
          <button
            className="border border-[#5C3CFF] px-6 py-2 rounded-full font-semibold text-[#5C3CFF] hover:bg-[#5C3CFF] hover:text-white transition-colors duration-200"
            onClick={() => setIsSigninOpen(true)}
          >
            Sign In
          </button>
        </ul>
      )}

      {/* Modals */}
      {isSignupOpen && <SignupModal onClose={() => setIsSignupOpen(false)} />}
      {isSigninOpen && <SigninModal onClose={() => setIsSigninOpen(false)} />}
    </nav>
  );
}

export default Navbar;
