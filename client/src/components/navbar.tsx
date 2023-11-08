import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <div className="flex bg-blue-300 py-5 font-medium hover:font-semibold justify-evenly w-screen">
      <Link href="/">Analysis</Link>
      <Link href="/predict">Prediction</Link>
    </div>
  );
}

export default Navbar;
