const API_URL = "http://localhost:5194/api/v2";

export async function getPokemonPage({page,pageSize,search,gen,types,order,}: {
  page: number;
  pageSize: number;
  search?: string;
  gen?: string;
  types?: string;
  order?: string | null;
}) {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
  });

  if (search) params.append("search", search);
  if (gen) params.append("gen", gen);
  if (types) params.append("types", types);
  if (order) params.append("order", order);

  const res = await fetch(
    `${API_URL}/Pokemon?${params.toString()}`,
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
