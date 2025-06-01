"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";
import Navbar from "./shared/Navbar";

const Session = () => {
  return (
    <div>
      <SessionProvider>
        <Navbar />
      </SessionProvider>
    </div>
  );
};

export default Session;
