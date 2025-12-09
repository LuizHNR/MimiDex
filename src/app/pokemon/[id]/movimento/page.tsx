import { getPokemonById, getMovesPokemonById } from "@/services/pokemonApi";
import type { PokemonDetails } from "@/app/types/Pokemon/pokemon";
import type { PokemonMoves } from "@/app/types/Moves/move";

import PokemonHeader from "@/app/components/pokemon/HeaderPokemon";
import PokemonFooter from "@/app/components/pokemon/FooterPokemon";
import { TypeBadge } from "@/app/components/pokemon/TypeBadge";
import { typeBgColors } from "@/utils/typeBgColors";

import { MoveGroup } from "@/app/components/pokemon/MoveGroup";

import PokemonSprite from "@/app/components/pokemon/PokemonSprite";

export default async function MovimentosPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  const pokemon: PokemonDetails = await getPokemonById(id);
  const moves: PokemonMoves = await getMovesPokemonById(id);

  const tipoPrincipal = pokemon.tipos[0].toLowerCase();
  const bgColor = typeBgColors[tipoPrincipal] ?? "bg-zinc-900";

  return (
    <main className={`${bgColor} min-h-screen pb-20`}>

      <PokemonHeader color={bgColor} id={id} />

      <div className="p-4 pt-6">

        <h1 className="text-3xl font-bold text-white">{pokemon.nome}</h1>
        <p className="text-zinc-200 mb-4">#{pokemon.numero}</p>

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
        

        {/* ======== MOVIMENTOS ======== */}
        <div className="space-y-10">

          {/* --- Level Up --- */}
          <MoveGroup title="Level Up" list={moves.levelUp} />

          {/* --- Máquina (TM/HM) --- */}
          <MoveGroup title="TMs" list={moves.machine} />

          {/* --- Tutor --- */}
          <MoveGroup title="Tutor" list={moves.tutor} />

          {/* --- Egg Moves --- */}
          <MoveGroup title="Egg Moves" list={moves.egg} />

          {/* --- Outros --- */}
          <MoveGroup title="Outros" list={moves.outros} />

        </div>

      </div>

      <PokemonFooter color={bgColor} />

    </main>
  );
}
