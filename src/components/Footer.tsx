"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Mail } from "lucide-react";
import { Github, Linkedin } from "@/components/icons/BrandIcons";

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", checkScrollTop);
    return () => window.removeEventListener("scroll", checkScrollTop);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="w-full bg-background border-t border-card-border/50 py-12 px-6 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo and Copyright */}
        <div className="text-center md:text-left">
          <p className="text-sm font-semibold text-foreground">
            Israt Jahan Eva <span className="text-primary font-bold">.dev</span>
          </p>
          <p className="text-xs text-muted mt-1.5">
            &copy; {new Date().getFullYear()} All rights reserved. Created with Next.js 15 & Framer Motion.
          </p>
        </div>

        {/* Social Quick Links */}
        <div className="flex items-center gap-4">
          <a
            href="mailto:israteva8084@gmail.com"
            className="p-2.5 rounded-lg border border-card-border bg-card/20 hover:border-primary/45 hover:text-primary text-muted transition-all"
            aria-label="Email"
          >
            <Mail className="h-4 w-4" />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-lg border border-card-border bg-card/20 hover:border-primary/45 hover:text-primary text-muted transition-all"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-lg border border-card-border bg-card/20 hover:border-primary/45 hover:text-primary text-muted transition-all"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Floating/Sticky Animated Back-To-Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 15, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.8 }}
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-24 right-6 p-3.5 rounded-full border bg-card border-card-border backdrop-blur-md shadow-lg text-primary hover:brightness-110 cursor-pointer z-40"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
