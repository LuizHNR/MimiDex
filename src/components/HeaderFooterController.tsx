"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function HeaderFooterController({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isPokemonRoute = pathname.startsWith("/pokemon");

  useEffect(() => {
    if (isPokemonRoute) {
      // Forçar o scroll normal
      document.body.style.overflow = "auto";
    } else {
      // Garantir que o overflow seja adequado
      document.body.style.overflow = "";
    }
  }, [isPokemonRoute]);

  return (
    <>
      {!isPokemonRoute && <Header />}
      {children}
      {!isPokemonRoute && <Footer />}
    </>
  );
}
