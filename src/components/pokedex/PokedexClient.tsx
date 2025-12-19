"use client";

import { useEffect, useState } from "react";
import PokemonList from "@/components/PokemonList";
import Spinner from "@/components/loading/Spinner";
import type { Pokedex } from "@/app/types/Pokedex/pokedex";
import { getPokedexById } from "@/services/pokemonApi";

function useDebounce<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

interface Props {
  id: string;
  initialData: Pokedex;
}

export default function PokedexClient({ id, initialData }: Props) {
  const [data, setData] = useState<Pokedex>(initialData);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    async function load() {
      setLoading(true);

      const result = await getPokedexById(id, debouncedSearch || undefined);

      setData(result);
      setLoading(false);
    }

    load();
  }, [id, debouncedSearch]);

  return (
    <>
      {/* BUSCA */}
      <input
        type="text"
        placeholder="Buscar Pokémon..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 w-full max-w-md rounded px-4 py-2 bg-emerald-100 text-black"
      />

      {loading ? <Spinner /> : <PokemonList items={data.pokemons} />}
    </>
  );
}
