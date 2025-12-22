import Image from "next/image";
import Link from "next/link";

import { TypeBadge } from "@/components/pokemon/TypeBadge";
import { typeBgColors } from "@/utils/typeBgColors";

interface PokemonCardProps {
  numero: number;
  nome: string;
  sprite: string;
  tipos: string[];
}

export default function PokemonCard({ numero, nome, sprite, tipos }: PokemonCardProps) {

  const tipoPrincipal = tipos[0].toLowerCase();
  const bgColor = typeBgColors[tipoPrincipal] ?? "bg-zinc-900";


  return (
    <Link href={`/pokemon/${numero}`} className="cursor-pointer">
      <div className={`${bgColor} text-white p-4 rounded-xl flex flex-col items-center gap-2 w-40 hover:scale-[1.03] transition`}>
        {sprite && (
          <Image
            src={sprite}
            alt={nome}
            width={120}
            height={120}
            className="pixelated"
          />
        )}


        <h2 className="text-lg font-bold">{nome}</h2>

        <p className="text-sm text-white">#{numero}</p>

        <div className="flex gap-2">
          {tipos.map((t) => (
            <TypeBadge key={t} tipo={t} />
          ))}
        </div>
      </div>
    
    </Link>
    
  );
}
