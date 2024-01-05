import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { Dices } from "lucide-react";

export default function Navbar() {
  return (
    <div className="bg-gray-100 py-2 border-b border-gray-200 fixed w-full z-10 top-0">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <Dices />{" "}
        </Link>
        <Link className={buttonVariants()} href="/sign-in">
          Sign in
        </Link>
      </div>
    </div>
  );
}
