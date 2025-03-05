"use client";

import { ThirdwebProvider } from "thirdweb/react";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export function ThirdwebProviderWrapper({ children }: Props) {
  return (
    <ThirdwebProvider>
      {children}
    </ThirdwebProvider>
  );
}