import type { Metadata } from "next";
import {Geist, Geist_Mono, Mona_Sans} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const ibmPlexSans = Geist({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
    weight:["400", "500", "600", "700"],
    display: "swap"
});

const monaSans = Mona_Sans({
    variable: "--font-mona-sans",
    subsets: ["latin"],
    display: "swap"
})

export const metadata: Metadata = {
  title: "Readora",
  description: "Transition your books into interactive AI Conversations.upload PDFs,and chat with your books using voice.",
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
          className={`${ibmPlexSans.variable} ${monaSans.variable} relative font-sans antialiased`}
        >
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
