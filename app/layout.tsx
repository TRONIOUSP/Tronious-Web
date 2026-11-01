import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans_Condensed, IBM_Plex_Sans } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { NO_FLASH_SCRIPT } from "@/lib/theme";
import { PLACEHOLDER_ATTRIBUTE, PLACEHOLDER_MARKING } from "@/lib/placeholders";
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
      {...(PLACEHOLDER_MARKING ? { [PLACEHOLDER_ATTRIBUTE]: "" } : {})}
      className={`${mono.variable} ${display.variable} ${body.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Must run before first paint: it applies the stored theme so dark-mode
            visitors never see a white flash, and opts motion in so that the
            reveal CSS can hide content only when JS is actually working. */}
        <script dangerouslySetInnerHTML={{ __html: NO_FLASH_SCRIPT }} />
      </head>
      <body>
        <a href="#main" data-skip-link="">Skip to main content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
