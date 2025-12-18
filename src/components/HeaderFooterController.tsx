"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";

const NO_LAYOUT_ROUTES = [
  `/pokemon`,
  `/Jogos/`,
];

export default function HeaderFooterController({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isNoLayoutRoute = NO_LAYOUT_ROUTES.some(route =>
    pathname.startsWith(route)
  );

  useEffect(() => {
    document.body.style.overflow = isNoLayoutRoute ? "auto" : "";
  }, [isNoLayoutRoute]);

  return (
    <>
      {!isNoLayoutRoute && <Header />}
      {children}
      {!isNoLayoutRoute && <Footer />}
    </>
  );
}
