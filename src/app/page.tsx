"use client";

import { useEffect, useState, useRef } from "react";
import PokemonList from "./components/PokemonList";
import { getPokemonPage } from "@/services/pokemonApi";
import Spinner from "./components/loading/Spinner";
import type { PokemonListItem } from "@/app/types/Pokemon/pokemon";

import AdvancedFilter from "./components/AdvancedFilter";


// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────
type PokemonFilters = {
  search: string;
  generations: number[];
  types: string[];
  order: string | null;
};

// ─────────────────────────────────────────────
// DEBOUNCE HOOK
// ─────────────────────────────────────────────
function useDebounce<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

export default function Home() {
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const observerRef = useRef<HTMLDivElement | null>(null);

  // ─────────────────────────────────────────────
  // FILTROS
  // ─────────────────────────────────────────────
  const [filters, setFilters] = useState<PokemonFilters>({
    search: "",
    generations: [],
    types: [],
    order: null,
  });

  const debouncedSearch = useDebounce(filters.search);

  // ✅ search final (não envia string vazia)
  const searchFinal =
    debouncedSearch.trim() === "" ? undefined : debouncedSearch;

  // ─────────────────────────────────────────────
  // RESET QUANDO FILTROS "REAIS" MUDAM
  // ─────────────────────────────────────────────
  useEffect(() => {
    setPage(1);
    setPokemons([]);
    setHasMore(true);
  }, [
    searchFinal,
    filters.generations,
    filters.types,
    filters.order,
  ]);

  // ─────────────────────────────────────────────
  // BUSCA NA API
  // ─────────────────────────────────────────────
  useEffect(() => {
    async function load() {
      if (!hasMore || loading) return;

      try {
        setLoading(true);

        const result = await getPokemonPage({
          page,
          pageSize: 50,
          search: searchFinal,
          gen: filters.generations.join(","),
          types: filters.types.join(","),
          order: filters.order,
        });

        setPokemons(prev =>
          page === 1 ? result.items : [...prev, ...result.items]
        );

        setHasMore(page < result.totalPages);
      } catch {
        setError("Erro ao carregar pokémons");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [
    page,
    searchFinal,
    filters.generations,
    filters.types,
    filters.order,
  ]);

  // ─────────────────────────────────────────────
  // SCROLL INFINITO
  // ─────────────────────────────────────────────
  useEffect(() => {
    if (!hasMore || loading) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPage(prev => prev + 1);
        }
      },
      { rootMargin: "300px" }
    );

    const el = observerRef.current;
    if (el) observer.observe(el);

    return () => observer.disconnect();
  }, [hasMore, loading]);

  if (error) return <div className="text-red-400">{error}</div>;

  return (
    <main className="text-white bg-black p-12">
      {/* BARRA DE BUSCA */}
      <input
        type="text"
        placeholder="Buscar Pokémon..."
        value={filters.search}
        onChange={(e) =>
          setFilters(prev => ({ ...prev, search: e.target.value }))
        }
        className="mb-6 w-full max-w-md rounded px-4 py-2 bg-emerald-100 text-black"
      />

      <AdvancedFilter
        filters={{
          generations: filters.generations,
          types: filters.types,
          order: filters.order,
        }}
        onApply={(newFilters) =>
          setFilters(prev => ({ ...prev, ...newFilters }))
        }
      />


      <PokemonList items={pokemons} />

      {hasMore && (
        <div ref={observerRef} className="flex justify-center py-10">
          {loading && <Spinner />}
        </div>
      )}
    </main>
  );
}
