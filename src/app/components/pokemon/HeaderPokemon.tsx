"use client";

import Image from "next/image";
import LogoMimi from "@/Images/Logo/Mimi.png"
import Link from "next/link";

export default function PokemonHeader({ color }: { color: string }) {
  return (
    <header className={`${color} text-white p-4 shadow-md transition-colors duration-500`}>
      <Link href="/">
        <h2>Mimidex</h2>
        <Image src={LogoMimi} alt="mimi-logo" />
      </Link>
    </header>
  );
}
