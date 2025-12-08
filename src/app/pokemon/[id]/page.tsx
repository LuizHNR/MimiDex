import { getPokemonById } from "@/services/pokemonApi";
import type { PokemonDetails } from "@/app/types/pokemon";
import Image from "next/image"
import { TypeBadge } from "@/app/components/TypeBadge";
import { typeBgColors } from "@/utils/typeBgColors";


export default async function PokemonPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  const pokemon: PokemonDetails = await getPokemonById(id);

  const tipoPrincipal = pokemon.tipos[0].toLowerCase();
  const bgColor = typeBgColors[tipoPrincipal] ?? "bg-zinc-900";

  return (
    <main className={`${bgColor} min-h-screen transition-colors duration-500`}>
      <p className="text-zinc-400">#{pokemon.numero}</p>

      <Image src={pokemon.sprite.front_default} alt={pokemon.nome}          
        width={220}
        height={220}
      />


      <div>
        <div>
          <h1 className="text-3xl font-bold">{pokemon.nome}</h1>
          <p >#{pokemon.numero}</p>
        </div>
        
        <div>
          <p>Descricão</p>
          <p>{pokemon.descricao}</p>
        </div>

        <div>
          <p>Tipo do pokemon</p>

          <div className="flex gap-2 mt-2">
            {pokemon.tipos.map((tipo) => (
              <TypeBadge key={tipo} tipo={tipo} />
            ))}
          </div>
        </div>


      </div>

    </main>
  );
}

