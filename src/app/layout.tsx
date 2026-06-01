import type { Metadata } from "next";
import "./globals.css";
import Analytics from "@/components/Analytics";

export const metadata: Metadata = {
  title: {
    template: "%s - LifeSimGrid",
    default: "LifeSimGrid - Custom Island Companion Toolset",
  },
  description:
    "Pixel Studio, QR Code Unlocker, Voice Simulator & Compatibility Calculator. 100% client-side, no server needed.",
  keywords: [
    "Pixel Converter",
    "QR Code Unlocker",
    "Voice Simulator",
    "Compatibility Calculator",
    "Island Companion Tool",
    "Pixel Grid",
    "85x85",
  ],
  robots: { index: true, follow: true },
  metadataBase: new URL("https://lifesimgrid.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-cream antialiased">
        <Analytics />
        {children}
      </body>
    </html>
  );
}
