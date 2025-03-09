"use client";

import React, { useState } from 'react';
import { ConnectButton } from "thirdweb/react";
import { client } from "@/lib/thirdwebClient";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white/50 backdrop-blur-md shadow-lg border-b">
      <div className="container mx-auto flex items-center justify-between px-4 py-2">
        <a href="/" className="flex items-center">
          <img src="/otglogoWebsite.png" alt="Logo" className="h-16 md:h-20" />
        </a>

        {/* Desktop Menu and Connect Button */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex space-x-8">
            <a href="#about" className="text-sm font-medium hover:text-gray-800 transition-colors">About</a>
            <a href="#utilities" className="text-sm font-medium hover:text-gray-800 transition-colors">Utilities</a>
            <a href="#roadmap" className="text-sm font-medium hover:text-gray-800 transition-colors">Roadmap</a>
            <a href="#nft-mint" className="text-sm font-medium hover:text-gray-800 transition-colors">Blasted Buck Mint</a>
          </div>
          <div className="ml-8">
            <ConnectButton client={client} />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded hover:bg-gray-100 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-start justify-center pt-16">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md transform transition-transform duration-300 ease-in-out">
            <div className="flex justify-between items-center mb-4">
              <a href="/" className="text-2xl font-bold flex items-center">
                <img src="/otglogoWebsite.png" alt="Logo" className="h-16" />
              </a>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex flex-col items-center justify-center space-y-4 w-full">
              <a href="#about" className="block px-4 py-2 text-base font-medium hover:bg-gray-100 rounded transition-colors w-full text-center" onClick={() => setIsMenuOpen(false)}>About</a>
              <a href="#utilities" className="block px-4 py-2 text-base font-medium hover:bg-gray-100 rounded transition-colors w-full text-center" onClick={() => setIsMenuOpen(false)}>Utilities</a>
              <a href="#roadmap" className="block px-4 py-2 text-base font-medium hover:bg-gray-100 rounded transition-colors w-full text-center" onClick={() => setIsMenuOpen(false)}>Roadmap</a>
              <a href="#nft-mint" className="block px-4 py-2 text-base font-medium hover:bg-gray-100 rounded transition-colors w-full text-center" onClick={() => setIsMenuOpen(false)}>Blasted Buck Mint</a>
              <div className="w-full flex justify-center mt-4">
                <ConnectButton client={client} />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;