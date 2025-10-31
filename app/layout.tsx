import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Rabba",
  description: "Your one stop solution to bill payments.",
  icons: {
    icon: "/logo.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
