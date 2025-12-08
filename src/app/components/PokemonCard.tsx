import Image from "next/image";
import Link from "next/link";

interface PokemonCardProps {
  numero: number;
  nome: string;
  sprite: string;
  tipos: string[];
}

export default function PokemonCard({ numero, nome, sprite, tipos }: PokemonCardProps) {
  return (
    <Link href={`/pokemon/${numero}`} className="cursor-pointer">
      <div className="bg-zinc-900 text-white p-4 rounded-xl flex flex-col items-center gap-2 w-40 hover:scale-[1.03] transition">
        {sprite && (
        <Image
          src={sprite}
          alt={nome}
          width={120}
          height={120}
        />
      )}


        <h2 className="text-lg font-bold">{nome}</h2>

        <p className="text-sm text-zinc-400">#{numero}</p>

        <div className="flex gap-2">
          {tipos.map((t) => (
            <span key={t} className="text-xs px-2 py-1 bg-zinc-700 rounded-md">
              {t}
            </span>
          ))}
        </div>
      </div>
    
    </Link>
    
  );
}
