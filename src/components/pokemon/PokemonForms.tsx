import Image from "next/image";
import Link from "next/link";
import { PokemonFormas } from "@/app/types/Pokemon/pokemon";

interface Props {
  formas: PokemonFormas[];
}

export default function PokemonForms({ formas }: Props) {
  if (!formas.length) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
      {formas.map((fm) => (
        <Link
          key={fm.numero}
          href={`/pokemon/${fm.numero}`}
          className="flex items-center gap-3 bg-white/15 p-3 rounded-xl backdrop-blur-sm hover:bg-white/25 transition"
        >
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${fm.numero}.png`}
            alt={fm.nome}
            width={56}
            height={56}
            className="pixelated"
          />

          <div>
            <p className="text-white font-semibold leading-tight">
              {fm.nome}
            </p>
            <p className="text-zinc-300 text-xs">
              Base Status: {fm.baseStatus}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
