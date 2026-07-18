import type { Metadata } from "next";
import { Cormorant_Garamond, Playfair_Display, Great_Vibes, Alex_Brush } from "next/font/google";
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

const alexBrush = Alex_Brush({
  variable: "--font-alex-brush",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sarang ❤️ Aishwarya | Engagement Invitation",
  description:
    "Together with our families,\nwe request the honour of your presence at the engagement ceremony of\nSarang & Aishwarya.\n\nTap to view the invitation.",
  openGraph: {
    title: "Sarang ❤️ Aishwarya | Engagement Invitation",
    description:
      "Together with our families,\nwe request the honour of your presence at the engagement ceremony of\nSarang & Aishwarya.\n\nTap to view the invitation.",
    url: "https://sarang-aishwarya-engagement.vercel.app/",
    siteName: "Sarang & Aishwarya Engagement",
    type: "website",
    images: [
      {
        url: "https://sarang-aishwarya-engagement.vercel.app/og-envelope.jpg",
        width: 1200,
        height: 630,
        alt: "Sarang and Aishwarya Engagement Invitation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sarang ❤️ Aishwarya | Engagement Invitation",
    description:
      "Together with our families,\nwe request the honour of your presence at the engagement ceremony of\nSarang & Aishwarya.\n\nTap to view the invitation.",
    images: ["https://sarang-aishwarya-engagement.vercel.app/og-envelope.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${playfair.variable} ${greatVibes.variable} ${alexBrush.variable} h-full`}
    >
      <body className="min-h-full overflow-hidden">{children}</body>
    </html>
  );
}
