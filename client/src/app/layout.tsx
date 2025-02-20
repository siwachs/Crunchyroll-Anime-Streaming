import type { Metadata } from "next";
import dynamic from "next/dynamic";

const Header = dynamic(() => import("@/components/header"), {
  loading: () => <HeaderSkeleton />,
});
import HeaderSkeleton from "@/components/header/index.skeleton";

import lato from "@/assets/fonts";
import "@/assets/styles/globals.css";

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
        <div className="h-full min-w-xs">
          <div className="app-layout">
            <Header />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
