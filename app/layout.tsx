import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans_Condensed, IBM_Plex_Sans } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const mono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--ff-mono",
});

const display = IBM_Plex_Sans_Condensed({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--ff-display",
});

const body = IBM_Plex_Sans({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--ff-body",
});

export const metadata: Metadata = {
  title: "[Company Name]",
  description: "Contract design and manufacturing for physical therapy and recovery devices.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${mono.variable} ${display.variable} ${body.variable}`}
    >
      <body>
        <Header />
        <main className="wrap">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
