import Image from "next/image";
import Link from "next/link";

interface PokemonCardProps {
  nome: string;
  sprite: string;
  efeito: string;
}

export default function ItensCard({ nome, sprite, efeito }: PokemonCardProps) {
  return (
    <Link href={`/Itens/detalhe/${nome}`} className="cursor-pointer">
      <div className="bg-zinc-900 text-white p-4 rounded-xl flex flex-col items-center gap-2 w-40 hover:scale-[1.03] transition">
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

          <p>{efeito}</p>

        </div>
    
    </Link>

      
    
  );
}
