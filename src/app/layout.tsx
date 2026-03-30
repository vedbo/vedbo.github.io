import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { LenisProvider } from "@/components/ui/lenis-provider";
import { TerminalOverlay } from "@/components/ui/terminal-modal";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.svg",
  },
  title: "Ved Borade | Computer Science & Data Science",
  description: "Portfolio of Ved Borade, a Computer Science & Data Science student at Rutgers Honors College. Robotics Researcher at PRACSYS Lab and Apple Specialist.",
  metadataBase: new URL("https://vedbo.github.io/"),
  openGraph: {
    type: "website",
    url: "https://vedbo.github.io/",
    title: "Ved Borade | Computer Science & Data Science",
    description: "Robotics Research, Data Science, and Engineering Projects. Building the future at Rutgers Honors College.",
    siteName: "Ved Borade Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ved Borade Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ved Borade | Computer Science & Data Science",
    description: "Robotics Research, Data Science, and Engineering Projects.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <LenisProvider>
          {children}
          <TerminalOverlay />
        </LenisProvider>
      </body>
    </html>
  );
}
