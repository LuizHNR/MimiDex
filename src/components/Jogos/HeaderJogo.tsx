"use client";

import Image from "next/image";
import LogoMimi from "@/Images/Logo/Mimi.png";
import Link from "next/link";

interface JogoHeaderProps {
  id: string;
  pokedexes: string[];
  regioes: string[];
}


export default function JogoHeader({ id, pokedexes, regioes }: JogoHeaderProps) {
  return (
    <header className="text-white p-4 shadow-md">

      <div className="flex items-center gap-4">
        <Link href="/">
          <button className="px-4 py-1 rounded-lg text-white font-semibold">
            Voltar
          </button>
        </Link>

        <Link href="/" className="flex items-center gap-2">
          <Image src={LogoMimi} alt="mimi-logo" width={40} />
          <h2>Mimidex</h2>
        </Link>
      </div>

      <nav className="flex gap-4 mt-4 font-semibold">

        <Link href={`/Jogos/${id}`}>Jogo</Link>

        {pokedexes.map((p) => (
          <Link key={p} href={`/pokedex/${p}`} className="hover:underline">
            Pokedex {p}
          </Link>
        ))}

        {regioes.map((r) => (
          <Link key={r} href={`/regiao/${r}`} className="hover:underline">
            Região {r}
          </Link>
        ))}

      </nav>


    </header>
  );
}
