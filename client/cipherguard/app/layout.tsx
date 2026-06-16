import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ToastProvider } from "@/components/ui/toast";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CipherGuard - Enhanced Caesar Cipher Security Platform",
  description: "Explore encryption, decryption, cryptanalysis, and security benchmarking through an interactive web platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-background antialiased">
        <ThemeProvider defaultTheme="system" storageKey="cipherguard-theme">
          <ToastProvider>
            <div className="flex min-h-screen">
            {/* Desktop Sidebar */}
            <Sidebar />
            
            {/* Main Content */}
            <main className="flex-1 md:ml-64 pb-16 md:pb-0">
              <div className="min-h-screen">
                {children}
              </div>
            </main>

            {/* Mobile Bottom Navigation */}
            <MobileNav />
            </div>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
