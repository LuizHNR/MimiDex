import Image from "next/image";
import Link from "next/link";
import { PokemonEvolucao } from "@/app/types/Pokemon/pokemon";
import { traduzirEvolucao } from "@/utils/traduzirEvolucao";

interface Props {
  evolucoes: PokemonEvolucao[];
}

export default function EvolutionChain({ evolucoes }: Props) {
  return (
    <div className="flex items-center gap-6 overflow-x-auto py-2">
      {evolucoes.map((ev, index) => (
        <div key={ev.numero} className="flex items-center gap-6">

          <Link
            href={`/pokemon/${ev.numero}`}
            className="flex flex-col items-center bg-white/20 p-3 rounded-xl backdrop-blur-sm hover:bg-white/30 transition"
          >
            <Image
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ev.numero}.png`}
              alt={ev.nome}
              width={72}
              height={72}
              className="pixelated"
            />

            <p className="text-white font-bold mt-1">
              {ev.nome}
            </p>

            <p className="text-zinc-200 text-xs text-center">
              {traduzirEvolucao(ev)}
            </p>
          </Link>

          {index < evolucoes.length - 1 && (
            <span className="text-white text-2xl">➜</span>
          )}
        </div>
      ))}
    </div>
  );
}
