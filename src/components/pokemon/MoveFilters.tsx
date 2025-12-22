"use client";

import { useEffect, useState } from "react";
import { getMovesPokemonById } from "@/services/pokemonApi";
import type { PokemonMoves } from "@/app/types/Moves/move";
import { MoveGroup } from "./MoveGroup";

interface Props {
  pokemonId: string;
  initialMoves: PokemonMoves;
}

const METHODS = [
  { label: "Level Up", value: "level-up" },
  { label: "TMs", value: "machine" },
  { label: "Tutor", value: "tutor" },
  { label: "Egg", value: "egg" },
];

export default function MoveFilters({ pokemonId, initialMoves }: Props) {
  const [method, setMethod] = useState<string | null>(null);
  const [moves, setMoves] = useState<PokemonMoves>(initialMoves);
  const [loading, setLoading] = useState(false);

  async function fetchMoves(selected?: string) {
    setLoading(true);
    const data = await getMovesPokemonById(pokemonId, {
      method: selected ?? undefined,
    });
    setMoves(data);
    setLoading(false);
  }

  function handleFilter(value: string | null) {
    setMethod(value);
    fetchMoves(value ?? undefined);
  }

  return (
    <div className="space-y-8">

      {/* ===== BOTÕES ===== */}
      <div className="flex flex-wrap gap-2">

        {METHODS.map(m => (
          <button
            key={m.value}
            onClick={() => handleFilter(m.value)}
            className={`px-4 py-2 rounded ${
              method === m.value
                ? "bg-white text-black"
                : "bg-zinc-700 text-white"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {loading && (
        <p className="text-zinc-300">Carregando movimentos...</p>
      )}

      {/* ===== LISTAS ===== */}
      <MoveGroup title="Level Up" list={moves.levelUp} />
      <MoveGroup title="TMs" list={moves.machine} />
      <MoveGroup title="Tutor" list={moves.tutor} />
      <MoveGroup title="Egg Moves" list={moves.egg} />
      <MoveGroup title="Outros" list={moves.outros} />
    </div>
  );
}
