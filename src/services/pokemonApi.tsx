
const API_URL = "http://localhost:5194/api/v2";

export async function getPokemonPage(page = 1, pageSize = 50) {
  const res = await fetch(
    `${API_URL}/Pokemon?page=${page}&pageSize=${pageSize}`,
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("Erro ao carregar pokémons");

  return res.json();
}



export async function getPokemonById(id: string | number) {
  const res = await fetch(`${API_URL}/Pokemon/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null; // ← retorna null em vez de explodir a página

  return res.json();

}


export async function getMovesPokemonById(id: string | number) {
  const res = await fetch(`${API_URL}/Pokemon/${id}/Movimentos`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Movimentos não encontrados");

  return res.json();
}



export async function getItemPage() {
  const res = await fetch(`${API_URL}/Item`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Erro ao carregar Item");

  return res.json(); // deve retornar { totalItems, items }
}


export async function getItemById(id: string | number) {
  const res = await fetch(`${API_URL}/Item/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Item não encontrado");

  return res.json();
}
