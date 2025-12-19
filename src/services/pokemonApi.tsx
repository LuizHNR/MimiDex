const API_URL = "http://localhost:5194/api/v2";



//------------------------------
// Pokemon
//------------------------------
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

  if (!res.ok) return null; 

  return res.json();

}


export async function getMovesPokemonById(id: string | number) {
  const res = await fetch(`${API_URL}/Pokemon/${id}/Movimentos`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Movimentos não encontrados");

  return res.json();
}


//------------------------------
// Itens
//------------------------------
export async function getItemPage({page,pageSize,search}: {
  page: number;
  pageSize: number;
  search?: string;

}) {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
  });

  if (search) params.append("search", search);

  const res = await fetch(
    `${API_URL}/Item?${params.toString()}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;

  return res.json();
}


export async function getItemById(id: string | number) {
  const res = await fetch(`${API_URL}/Item/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Item não encontrado");

  return res.json();
}


//------------------------------
// Jogos
//------------------------------
export async function getJogos() {
  const res = await fetch(
    `${API_URL}/VersionGroup`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;

  return res.json();
}


export async function getJogoById(id: string | number) {
  const res = await fetch(`${API_URL}/VersionGroup/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Item não encontrado");

  return res.json();
}



//------------------------------
// Pokedex
//------------------------------
export async function getPokedexById(id: string, search?: string) {
  const params = new URLSearchParams();

  if (search) params.set("search", search);

  const url =
    `${API_URL}/pokedex/${id}` +
    (params.toString() ? `?${params.toString()}` : "");

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Erro ao buscar pokedex");

  return res.json();
}





//------------------------------
// Regiao
//------------------------------
export async function getRegiaoById(id: string | number) {
  const res = await fetch(`${API_URL}/Region/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Região não encontrada");

  return res.json();
}



//------------------------------
// Natures
//------------------------------
export async function getNatures() {
  const res = await fetch(
    `${API_URL}/Nature`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;

  return res.json();
}



export async function getJNatureById(id: string | number) {
  const res = await fetch(`${API_URL}/Nature/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Nature não encontrada");

  return res.json();
}