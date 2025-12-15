"use client";

import { useEffect, useState, useRef } from "react";
import PokemonList from "./components/PokemonList";
import { getPokemonPage } from "@/services/pokemonApi";
import Spinner from "./components/loading/Spinner";
import type { PokemonListItem } from "@/app/types/Pokemon/pokemon";

export default function Home() {
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const observerRef = useRef<HTMLDivElement | null>(null);

  // ✅ BUSCA DE DADOS (ÚNICO RESPONSÁVEL PELA API)
  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        console.log("📡 Chamando API página:", page);

        const result = await getPokemonPage(page, 50);

        setPokemons((prev) =>
          page === 1 ? result.items : [...prev, ...result.items]
        );

        setHasMore(page < result.totalPages);
      } catch (err) {
        setError("Erro ao carregar pokémons");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [page]);

  // ✅ OBSERVER (SÓ MUDA A PAGE)
  useEffect(() => {
    if (!hasMore || loading) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      {
        rootMargin: "300px",
      }
    );

    const el = observerRef.current;
    if (el) observer.observe(el);

    return () => observer.disconnect();
  }, [hasMore, loading]);

  if (error) return <div className="text-red-400">{error}</div>;

  return (
    <main className="text-white bg-black p-12">
      <PokemonList items={pokemons} />

      {hasMore && (
        <div ref={observerRef} className="flex justify-center py-10">
          {loading && <Spinner />}
        </div>
      )}
    </main>
  );
}
