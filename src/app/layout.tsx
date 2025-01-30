import type { Metadata } from "next";
import { Providers } from "@/components/providers/providers";
import { geistMono, geistSans } from "@/config/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Teslo shop",
  description: "Teslo shop E-Commerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
