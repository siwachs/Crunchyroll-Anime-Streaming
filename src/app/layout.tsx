import type { Metadata } from "next";
import lato from "@/assets/fonts";

import Header from "@/components/header";

import "@/assets/globals.css";

export const metadata: Metadata = {
  title: "Crunchyroll: Watch Popular Anime, Play Games & Shop Online",
  description:
    "Embark on an anime adventure with Crunchyroll, your ultimate destination for watching a vast collection of anime series and movies. Delve into the captivating worlds of hit titles such as One Piece, Jujutsu Kaisen, Chainsaw Man, and Attack on Titan. Start your free trial today and immerse yourself in the thrilling world of anime with Crunchyroll!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={lato.className}>
        <div className="h-full min-w-80">
          <div className="flex flex-col">
            <Header />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
