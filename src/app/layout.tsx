import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import QueryProvider from "@/components/providers/QueryProvider";
import { FooterProvider } from "@/components/providers/FooterContext";
import ConditionalFooter from "@/components/common/ConditionalFooter";
import { Toaster } from "react-hot-toast";

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
           <Toaster
  position="bottom-right"
  toastOptions={{
    style: {
      background: "#fff",
      color: "#0D4C3E", 
      border: "1px solid #0D4C3E",
      padding: "12px 16px",
      fontSize: "14px",
      fontWeight: "500",
    },
    success: {
      iconTheme: {
        primary: "#0D4C3E",
        secondary: "#fff",
      },
    },
    error: {
      iconTheme: {
        primary: "#d00000",
        secondary: "#fff",
      },
    },
  }}
  />
            <ConditionalFooter />
          </QueryProvider>
        </FooterProvider>
      </body>
    </html>
  );
}
