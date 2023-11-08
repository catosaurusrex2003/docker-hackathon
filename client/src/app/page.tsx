"use client";

import Loadinganimation from "@/components/LoadingAnimation";
import ImageInput from "@/components/imageInput";
import Navbar from "@/components/navbar";
import axios from "axios";
import { useState } from "react";

export default function Home() {
  return (
    <main className="w-screen h-screen bg-[#f1fdff]">
      <Navbar/>
      <iframe
        width="60%"
        height="100%"
        src="https://lookerstudio.google.com/embed/reporting/bc9c5b64-e6cc-496f-86a1-12e460ca3b39/page/a8YhD"
        frameBorder="0"
        style={{
          border: "0",
          position: "fixed",
          top: 70,
          left: "50%",
          transform: "translateX(-50%)",
        }}
        allowFullScreen
      ></iframe>
    </main>
  );
}
