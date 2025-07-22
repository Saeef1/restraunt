import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import CartButton from "@/components/cartButton";
import { Inter, Baloo_Bhaijaan_2 } from "next/font/google";
import Navigation from "@/components/ui/Navigation";
import Footer from "@/components/ui/footer";
import GlobalProvider from "./GlobalProvider";
import {
  ClerkProvider,
} from "@clerk/nextjs";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const baloo_bhaijaan_2 = Baloo_Bhaijaan_2({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Restraunt",
  description: "whre you can find the best BBQ in town",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${baloo_bhaijaan_2.variable} antialiased`}
        >
          <GlobalProvider>
            <Navigation />
            <Toaster position="top-center"/>
            {children}
            <CartButton />
            <Footer />
          </GlobalProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
