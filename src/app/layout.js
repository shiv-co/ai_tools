import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";

export const metadata = {
  metadataBase: new URL("https://aitechtactics.com"),

  title: {
    default: "AI Tech Tactics – Free Online Tools & AI Utilities",
    template: "%s | AI Tech Tactics",
  },

  description:
    "AI Tech Tactics provides free online tools for PDF, image, text, media, and AI productivity. Fast, secure, and browser-based.",

  keywords: [
    "AI tools",
    "free online tools",
    "PDF tools",
    "image tools",
    "text tools",
    "Media productivity tools",
  ],

  openGraph: {
    type: "website",
    url: "https://aitechtactics.com",
    siteName: "AI Tech Tactics",
  },

  twitter: {
    card: "summary_large_image",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[var(--bg)] text-[var(--text-primary)] transition-colors duration-300">

        {/* Google AdSense Script */}
        <Script
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXX"
          crossOrigin="anonymous"
        />

        <Header />
        {children}
        <Footer />
        {/* <!-- Google tag (gtag.js) --> */}


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
