import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GamerPortal | Play Free Online Games",
  description: "Play the best free online games, including action, puzzle, sports, and adventure games. No downloads required!",
  keywords: ["games", "free games", "online games", "html5 games", "gamer portal"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
