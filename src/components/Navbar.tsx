import React from 'react';
import { ConnectButton } from "thirdweb/react";

import { client } from "@/lib/thirdwebClient";
const Navbar = () => {
  return (
    <nav className="bg-white py-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <a href="/public/otglogoWebsite.png" className="text-2xl font-bold">
          <img src="/otglogoWebsite.png" alt="Logo" className="h-16" />
        </a>
        <div className="flex space-x-4">
          <a href="/">About</a>
          <a href="/">The Cause</a>
          <a href="/">Mint Now</a>
        </div>
        <ConnectButton client={client} />
      </div>
    </nav>
  );
};

export default Navbar;