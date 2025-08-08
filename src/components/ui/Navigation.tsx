"use client";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "@/public/burno logo.png";
import { usePathname } from "next/navigation";
import { AlignJustify } from "lucide-react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isSignedIn, user } = useUser();
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "#menu", label: "Menu" },
    { href: "/Cart", label: "Cart" },
  ];
  
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || process.env.ADMIN_EMAIL;

  const isAdmin =
    isSignedIn &&
    user?.primaryEmailAddress?.emailAddress === adminEmail

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-md border-b mb-2 border-red-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <i className="fas fa-fire text-[crimson] text-2xl mr-2">
                <Image
                  src={Logo}
                  alt="Logo"
                  width={50}
                  height={50}
                  className="inline-block mr-2"
                />
              </i>
              <span className="font-bebas ml-[-16px] text-xl text-white">
                Burato
              </span>
            </Link>

            <div className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors duration-300 ${
                    pathname === link.href
                      ? "text-[crimson]"
                      : "text-white hover:text-[crimson]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {isAdmin && (
                <Link
                  href="/Admin"
                  className={`transition-colors duration-300 ${
                    pathname === "/Admin"
                      ? "text-[crimson]"
                      : "text-white hover:text-[crimson]"
                  }`}
                >
                  Admin
                </Link>
              )}

              <SignedOut>
                <SignInButton />
                <SignUpButton>Sign Up</SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>

            <div className="flex gap-2 md:hidden">
              <SignedOut>
                <SignInButton />
                <SignUpButton>Sign Up</SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>

              <button
                className="text-white hover:text-[crimson]"
                onClick={toggleMobileMenu}
              >
                <i className="fas fa-bars text-xl">
                  <AlignJustify />
                </i>
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-black/95 border-t border-red-900/30">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-3 py-2 transition-colors duration-300 ${
                    pathname === link.href
                      ? "text-[crimson]"
                      : "text-white hover:text-[crimson]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {isAdmin && (
                <Link
                  href="/Admin"
                  className={`block px-3 py-2 transition-colors duration-300 ${
                    pathname === "/Admin"
                      ? "text-[crimson]"
                      : "text-white hover:text-[crimson]"
                  }`}
                >
                  Admin
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
