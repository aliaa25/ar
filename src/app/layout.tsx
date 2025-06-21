import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import QueryProvider from "@/components/providers/QueryProvider";
import { FooterProvider } from "@/components/providers/FooterContext";
import ConditionalFooter from "@/components/common/ConditionalFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-mainbackground overflow-x-hidden`}
      >
        <FooterProvider>
          <QueryProvider>
            <Navbar />
            {children}
            <ConditionalFooter />
          </QueryProvider>
        </FooterProvider>
      </body>
    </html>
  );
}
