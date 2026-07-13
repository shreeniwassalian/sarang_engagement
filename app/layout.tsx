import type { Metadata } from "next";
import { Cormorant_Garamond, Playfair_Display, Great_Vibes } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sarang & Aishwaria — Engagement Invitation",
  description:
    "You are cordially invited to celebrate the engagement of Sarang Yadav & Aishwaria.",
  openGraph: {
    title: "Sarang & Aishwaria — Engagement Invitation",
    description: "A celebration of love and new beginnings.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${playfair.variable} ${greatVibes.variable} h-full`}
    >
      <body className="min-h-full overflow-hidden">{children}</body>
    </html>
  );
}
