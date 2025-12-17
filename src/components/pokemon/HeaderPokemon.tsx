"use client";

import Image from "next/image";
import LogoMimi from "@/Images/Logo/Mimi.png"
import Link from "next/link";

export default function PokemonHeader({ color, id }: { color: string, id: string }) {
  return (
    <header className={`${color} text-white p-4 shadow-md transition-colors duration-500`}>

      <div>

        <Link href="/">
          <button
            className="px-4 py-1 rounded-lg text-black font-semibold shadow-md active:scale-95 transition">
            Voltar
          </button>
        </Link>


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
