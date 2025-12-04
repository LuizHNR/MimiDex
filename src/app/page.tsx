"use client";

import { useEffect, useState } from "react";
import PokemonList from "./components/PokemonList";
import { getPokemonPage } from "./services/pokemonApi";
import type { PokemonListItem } from "@/app/types/pokemon";

export default function Home() {
  const [data, setData] = useState<PokemonListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const result = await getPokemonPage();  // ← retorna todos
        setData(result.items);                  // ← salva só a lista
      } catch {
        setError("Erro ao carregar pokémons");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <div className="text-white">Carregando...</div>;
  if (error) return <div className="text-red-400">{error}</div>;
  if (!data.length) return <div className="text-white">Nenhum pokémon</div>;

  return (
    <main className="min-h-screen text-white bg-black px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">MimiDex</h1>

      <PokemonList items={data} />  

    </main>
  );
}
