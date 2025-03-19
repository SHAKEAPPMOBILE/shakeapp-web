import type { Metadata } from "next";
import "./globals.css";
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: "Shake",
  description: "Shake web application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
