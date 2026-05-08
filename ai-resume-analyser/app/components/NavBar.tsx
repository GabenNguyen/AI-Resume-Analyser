"use client";

import { Microscope } from "lucide-react";
import { motion } from "framer-motion";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";

export default function NavBar() {
  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/70 backdrop-blur-lg"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* SINGLE ROW */}
        <div className="flex h-20 items-center justify-between">
          {/* LEFT: Logo */}
          <div className="flex items-center gap-2">
            <Link href="/" className="inline-flex gap-3">
              <Microscope className="h-6 w-6 text-foreground" />
              <span className="text-2xl font-extrabold tracking-tight">
                ResumeScope
              </span>
            </Link>
          </div>

          {/* RIGHT: Actions */}
          <div className="flex items-center gap-3">
            <ModeToggle />
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
