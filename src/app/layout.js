import "./globals.css";
import { Bricolage_Grotesque, DM_Sans, JetBrains_Mono } from "next/font/google";
import Script from "next/script";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SeoJsonLd from "@/components/SeoJsonLd";
import { buildMetadata, organizationSchema } from "@/lib/seo";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/site";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-bricolage",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-dm-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  ...buildMetadata({
    title: `${SITE_NAME} | Free Online Tools`,
    description: SITE_DESCRIPTION,
  }),
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "jzQ4LLW8pnU16xvg9P8nnwW9jIfcc1eB0cRUxrMF9CY",
  },
  icons: {
    icon: absoluteUrl("/favicon.ico"),
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`dark ${bricolage.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-[var(--bg)] text-[var(--text-primary)] transition-colors duration-300">
        <Script
          async
          strategy="lazyOnload"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3808428706215749"
          crossOrigin="anonymous"
        />

        <Header />
        {children}
        <Footer />
        <SeoJsonLd data={organizationSchema()} />

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-WVR34ZM8P8"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WVR34ZM8P8');
          `}
        </Script>
      </body>
    </html>
  );
}
