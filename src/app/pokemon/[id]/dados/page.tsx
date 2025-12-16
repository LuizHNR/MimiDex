import { getPokemonById } from "@/services/pokemonApi";
import type { PokemonDetails } from "@/app/types/Pokemon/pokemon";
import Image from "next/image";
import { typeBgColors } from "@/utils/typeBgColors";

import PokemonHeader from "@/app/components/pokemon/HeaderPokemon";
import PokemonFooter from "@/app/components/pokemon/FooterPokemon";

import PokemonSprite from "@/app/components/pokemon/PokemonSprite";



export default async function DadosPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  const pokemon: PokemonDetails = await getPokemonById(id);

const tipoPrincipal = pokemon.tipos[0].toLowerCase();
  const bgColor = typeBgColors[tipoPrincipal] ?? "bg-zinc-900";

  return (
    <main className={`${bgColor} min-h-screen transition-colors duration-500`}>

      {/* HEADER DINÂMICO */}
      <PokemonHeader color={bgColor} id={id} />

      <div className="p-4 pb-20">

        {/* INFO PRINCIPAL */}
        <p className="text-zinc-200">#{pokemon.numero}</p>

        <PokemonSprite
          nome={pokemon.nome}
          cryUrl={pokemon.cryUrl}
          sprite={{
            front: pokemon.sprite.front_default,
            back: pokemon.sprite.back_default,
            front_shiny: pokemon.sprite.front_shiny,
            back_shiny: pokemon.sprite.back_shiny
          }}
        />


        {/* HABILIDADES */}
        <div className="mt-6">
          <p className="text-white font-semibold">Habilidades</p>
          <ul className="mt-2 space-y-2">
            {pokemon.habilidades.map((h) => (
              <li key={h.nome}>
                <p className="text-white font-bold capitalize">{h.nome}</p>
                <p className="text-zinc-200">{h.descricao}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* EGG GROUPS */}
        <div className="mt-6">
          <p className="text-white font-semibold">Egg Groups</p>
          <p className="text-zinc-100 capitalize">{pokemon.eggGroups.join(", ")}</p>
        </div>


      <Image src={pokemon.sprite.front_default} alt={pokemon.nome}          
        width={220}
        height={220}
      />

      <Image src={pokemon.sprite.front_shiny} alt={pokemon.nome}          
        width={220}
        height={220}
      />

        {/* MULTIPLIERS */}
        <div className="mt-6 space-y-4">
          <p className="text-white font-semibold text-lg">Fraquezas / Resistências</p>

          {Object.keys(pokemon.multipliers.fraquezas).length > 0 && (
            <div>
              <p className="text-red-300 font-semibold">Fraquezas</p>
              <ul className="text-zinc-100 flex flex-wrap gap-2 mt-1">
                {Object.entries(pokemon.multipliers.fraquezas).map(([tipo, mult]) => (
                  <li key={tipo}>{tipo} ×{mult}</li>
                ))}
              </ul>
            </div>
          )}

          {Object.keys(pokemon.multipliers.resistencias).length > 0 && (
            <div>
              <p className="text-green-300 font-semibold">Resistências</p>
              <ul className="text-zinc-100 flex flex-wrap gap-2 mt-1">
                {Object.entries(pokemon.multipliers.resistencias).map(([tipo, mult]) => (
                  <li key={tipo}>{tipo} ×{mult}</li>
                ))}
              </ul>
            </div>
          )}

          {Object.keys(pokemon.multipliers.imunidades).length > 0 && (
            <div>
              <p className="text-yellow-300 font-semibold">Imunidades</p>
              <ul className="text-zinc-100 flex flex-wrap gap-2 mt-1">
                {Object.entries(pokemon.multipliers.imunidades).map(([tipo]) => (
                  <li key={tipo}>{tipo}</li>
                ))}
              </ul>
            </div>
          )}
        </div>


        {/* STATS */}
        <div className="mt-10">
          <p className="text-white font-semibold text-lg">Stats</p>
          <p>Status Base:</p>
          <p>{pokemon.baseStatus}</p>

          <div className="mt-4 space-y-3">
            {pokemon.stats.map((stat) => (
              <div key={stat.nome}>
                <p className="text-white capitalize">{stat.nome}</p>
                <div className="w-full bg-white/20 h-3 rounded-full">
                  <div
                    className="h-3 bg-white rounded-full"
                    style={{ width: `${(stat.valor / 255) * 100}%` }}
                  ></div>
                </div>
                <p className="text-zinc-200 text-sm mt-1">{stat.valor}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      <PokemonFooter color={bgColor} />

    </main>
  );
}
