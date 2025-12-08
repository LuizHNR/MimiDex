"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

export default function HeaderFooterController({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isPokemonRoute = pathname.startsWith("/pokemon");

  return (
    <>
      {!isPokemonRoute && <Header />}
      {children}
      {!isPokemonRoute && <Footer />}
    </>
  );
}
