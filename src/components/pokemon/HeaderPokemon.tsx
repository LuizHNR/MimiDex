"use client";

import Image from "next/image";
import LogoMimi from "@/Images/Logo/Mimi.png"
import Link from "next/link";

import BackButton from "../botao/BackButton";

export default function PokemonHeader({ color, id }: { color: string, id: string }) {
  return (
    <header className={`${color} text-white p-4 shadow-md transition-colors duration-500`}>

      <div>

        <BackButton />


        <Link href="/">
          <h2>Mimidex</h2>
          <Image src={LogoMimi} alt="mimi-logo" />
        </Link>

      </div>

      <nav className="flex gap-4 text-white font-semibold">
          <Link href={`/pokemon/${id}`} className="hover:underline">Resumo</Link>
          <Link href={`/pokemon/${id}/dados`} className="hover:underline">Dados</Link>
          <Link href={`/pokemon/${id}/movimento`} className="hover:underline">Movimentos</Link>
      </nav>

    </header>
  );
}
