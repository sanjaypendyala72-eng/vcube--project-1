"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const ClientAppWrapper = dynamic(() => import("./ClientAppWrapper"), {
  ssr: false,
  loading: () => <div style={{ background: "#0a0a0c", minHeight: "100vh" }} />,
});

export default function ClientProvider({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div style={{ background: "#0a0a0c", minHeight: "100vh" }} />;
  }

  return <ClientAppWrapper>{children}</ClientAppWrapper>;
}
