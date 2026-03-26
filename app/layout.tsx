import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-ui",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jsonintelligenceplatform.com"),
  title: {
    default: "JSON Intelligence Platform",
    template: "%s | JSON Intelligence Platform",
  },
  description:
    "JSON Intelligence Platform helps developers format, validate, compare, and convert JSON with a clean SaaS-style interface.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} bg-[#050505] text-[#ededed] antialiased`}
      >
        <div className="min-h-screen bg-[#050505] text-[#ededed]">
          <SiteHeader />
          {children}
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
