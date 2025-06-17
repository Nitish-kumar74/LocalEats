import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Load fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Set metadata including favicon
export const metadata = {
  title: "LocalEats",
  description: "All local shops is there",
  icons: {
    icon: "/logo.jpeg", // Make sure logo.jpeg is inside the public/ directory
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Optional: If you want manual control */}
        <link rel="icon" href="/logo.jpeg" type="image/jpeg" />
        <title>LocalEats</title>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
