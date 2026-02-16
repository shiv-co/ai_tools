import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

<script
  async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXX"
  crossOrigin="anonymous"
/>

export const metadata = {
  title: "Free AI Tools – Smart AI Tools Hub",
  description: "Discover free AI tools for students, creators and businesses.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[var(--bg)] text-[var(--text-primary)] transition-colors duration-300">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
