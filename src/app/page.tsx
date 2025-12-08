"use client";

import { useEffect, useState } from "react";
import PokemonList from "./components/PokemonList";
import { getPokemonPage } from "@/services/pokemonApi";
import Spinner from "./components/Spinner";
import type { PokemonListItem } from "@/app/types/pokemon";

export default function Home() {
  const [data, setData] = useState<PokemonListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        // esconder header e footer
        document.body.classList.add("hide-layout");

        const result = await getPokemonPage();
        setData(result.items);

      } catch {
        setError("Erro ao carregar pokémons");
      } finally {
        setLoading(false);

        // mostrar header e footer
        document.body.classList.remove("hide-layout");
      }
    }

    load();
  }, []);

  if (loading)
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-black text-white gap-6">
        <Spinner />
        <p className="text-lg opacity-80 animate-pulse">Carregando...</p>
      </div>
    );

  if (error) return <div className="text-red-400">{error}</div>;
  if (!data.length) return <div className="text-white">Nenhum pokémon</div>;

  return (
    <main className="text-white bg-black p-12">
      <PokemonList items={data} />
    </main>
  );
}
