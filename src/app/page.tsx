"use client";

import { useEffect, useState } from "react";
import PokemonList from "./components/PokemonList";
import { getPokemonPage, PokemonPageResponse } from "./services/pokemonApi";

export default function Home() {

  const [page, setPage] = useState(1);
  const [data, setData] = useState<PokemonPageResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadPage(p: number) {
    try {
      setLoading(true);
      setError("");
      const result = await getPokemonPage(p);
      setData(result);
    } catch {
      setError("Erro ao carregar página");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPage(page);
  }, [page]);

  if (loading) return <div className="text-white">Carregando...</div>;
  if (error) return <div className="text-red-400">{error}</div>;
  if (!data) return <div className="text-white">Sem dados</div>;

  return (
    <main className="min-h-screen text-white bg-black px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">MimiDex</h1>

      <PokemonList items={data.items} />

      <div className="flex justify-center gap-4 mt-10">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-700 rounded disabled:opacity-40"
        >
          ◀ Voltar
        </button>

        <span className="text-xl">
          Página {page} / {data.totalPages}
        </span>

        <button
          onClick={() => {
            if (!data) return;
            setPage((p) => (p + 1));
          }}
          disabled={page >= data.totalPages}
          className="px-4 py-2 bg-gray-700 rounded disabled:opacity-40"
        >
          Avançar ▶
        </button>
      </div>
    </main>
  );
}
