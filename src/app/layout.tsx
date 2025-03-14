import type { Metadata } from "next";
import "./globals.css";

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
      </body>
    </html>
  );
}
