import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import HeaderFooterController from "@/app/components/HeaderFooterController";

const figtree = Figtree({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-figtree",
});

export const metadata: Metadata = {
  title: "Mimidex",
  description: "Pokédex personalizada",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className={`${figtree.variable} antialiased`}>
        <HeaderFooterController>
          {children}
        </HeaderFooterController>
      </body>
    </html>
  );
}
