import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { WalletProvider } from "@/extras/providers/WalletProvider";
import { Sidebar } from "@/extras/components/Sidebar";
import { Header } from "@/extras/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Raffle Mania",
  description: "Solana Raffle Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <WalletProvider>
          <div className="flex min-h-screen bg-[#202235]">
            <Sidebar />
            <div className="flex-1 flex flex-col">
              <Header />
              {children}
            </div>
          </div>
        </WalletProvider>
      </body>
    </html>
  );
}
