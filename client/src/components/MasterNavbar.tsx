"use client";

import { useRef, useEffect, useState } from "react";
import { SearchIcon, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

function MasterNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  // Ctrl+K focus shortcut
  useEffect(() => {
    const handleShortcut = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  // Focus input when opening search in mobile
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchRef.current?.focus(), 50);
    }
  }, [searchOpen]);

  return (
    <div className="relative bg-transparent border-b border-muted w-full flex justify-between items-center py-4 px-4">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        {/* Logo + Brand */}
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="w-12 h-12" />
        </div>
      </div>

      {/* Desktop Nav Links */}
      <div className="hidden md:flex px-4 space-x-6">
        <Link href="#" className="cursor-pointer font-semibold text-lg">
          Home
        </Link>
        <Link href="#" className="cursor-pointer font-semibold text-lg">
          Projects
        </Link>
        <Link href="#" className="cursor-pointer font-semibold text-lg">
          Explore
        </Link>
        <Link href="#" className="cursor-pointer font-semibold text-lg">
          Profile
        </Link>
      </div>

      {/* Desktop Search Bar */}
      <div className="flex flex-1 mx-4 relative">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground bg-muted px-2 py-0.5 rounded-md pointer-events-none">
          Ctrl+K
        </span>
        <Input
          ref={searchRef}
          type="search"
          placeholder="Search projects"
          className="w-full pl-10 pr-16"
        />
      </div>

      {/* Right Side - Auth Buttons */}
      <div className="flex items-center gap-4">
        <SignedOut>
          <SignInButton mode="modal">
            <Button>Sign In</Button>
          </SignInButton>

          <SignUpButton mode="modal">
            <Button variant={"outline"} className="hidden md:flex">
              Sign Up
            </Button>
          </SignUpButton>
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full right-0 w-48 bg-background shadow-lg border border-muted p-4 space-y-4 md:hidden">
          <Link href="#" className="block cursor-pointer font-semibold text-lg">
            Home
          </Link>
          <Link href="#" className="block cursor-pointer font-semibold text-lg">
            Projects
          </Link>
          <Link href="#" className="block cursor-pointer font-semibold text-lg">
            Explore
          </Link>
          <Link href="#" className="block cursor-pointer font-semibold text-lg">
            Profile
          </Link>
        </div>
      )}
    </div>
  );
}

export default MasterNavbar;
