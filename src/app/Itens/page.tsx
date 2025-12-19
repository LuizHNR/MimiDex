"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ItensList from "@/components/Item/ItensList";
import { getItemPage } from "@/services/pokemonApi";
import Spinner from "@/components/loading/Spinner";
import type { ListItem } from "@/app/types/Item/item";

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────
type PokemonFilters = {
  search: string;
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

export default function Itens() {
  const [data, setData] = useState<ListItem[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  const observerRef = useRef<HTMLDivElement | null>(null);


  // ─────────────────────────────────────────────
  // FILTROS 
  // ─────────────────────────────────────────────
  const [filters, setFilters] = useState<PokemonFilters>(() => ({
    search: searchParams.get("search") ?? ""
  }));

    const debouncedSearch = useDebounce(filters.search);

    const searchFinal =
      debouncedSearch.trim() === "" ? undefined : debouncedSearch;


  // ─────────────────────────────────────────────
  // SINCRONIZA FILTROS → URL
  // ─────────────────────────────────────────────
  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.search) params.set("search", filters.search);

    router.replace(`?${params.toString()}`, { scroll: false });
  }, [filters, router]);


  // ─────────────────────────────────────────────
  // RESET QUANDO FILTROS REAIS MUDAM
  // ─────────────────────────────────────────────
  useEffect(() => {
    if (debouncedSearch === filters.search) {
      setPage(1);
      setData([]);
      setHasMore(true);
    }
  }, [debouncedSearch, filters.search]);

  

  useEffect(() => {
    async function load() {
      if (!hasMore || loading) return;

      try {
        setLoading(true);

        const result = await getItemPage({
          page,
          pageSize: 50,
          search: searchFinal
        });

        setData(prev =>
          page === 1 ? result.items : [...prev, ...result.items]
        );

        setHasMore(page < result.totalPages);

      } catch {
        setError("Erro ao carregar itens");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [
    page,
    searchFinal,
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

      {/* BUSCA */}
      <input
        type="text"
        placeholder="Buscar Itens..."
        value={filters.search}
        onChange={(e) =>
          setFilters(prev => ({ ...prev, search: e.target.value }))
        }
        className="mb-6 w-full max-w-md rounded px-4 py-2 bg-emerald-100 text-black"
      />

      <ItensList items={data} />

      {hasMore && (
        <div ref={observerRef} className="flex justify-center py-10">
          {loading && <Spinner />}
        </div>
      )}
    </main>
  );
}
