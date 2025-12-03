import type { PokemonListItem } from "@/app/types/pokemon";

export interface PokemonPageResponse {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  items: PokemonListItem[];
}

export async function getPokemonPage(page: number = 1): Promise<PokemonPageResponse> {
  const res = await fetch(
    `http://localhost:5194/api/v2/Pokemon?page=${page}`,
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("Erro ao carregar pokémons");

  return res.json();
}






export async function getPokemonById(idOrName: string) {
  const res = await fetch(`http://localhost:5194/api/v2/Pokemon/${idOrName}`);

  if (!res.ok) throw new Error("Pokemon não encontrado");

  return res.json();
}

