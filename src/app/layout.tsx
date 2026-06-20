import type { Metadata } from "next";
import { Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-noto",
});

export const metadata: Metadata = {
  title: "Distinguished Student System",
  description: "Apply to become a distinguished student",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={notoSans.variable}>
      <body className="font-sans antialiased bg-white text-ink">
        {children}
      </body>
    </html>
  );
}
