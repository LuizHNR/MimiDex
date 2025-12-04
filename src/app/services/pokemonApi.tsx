

export async function getPokemonPage() {
  const res = await fetch("http://localhost:5194/api/v2/Pokemon", {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Erro ao carregar pokémons");

  return res.json(); // deve retornar { totalItems, items }
}






export async function getPokemonById(idOrName: string) {
  const res = await fetch(`http://localhost:5194/api/v2/Pokemon/${idOrName}`);

  if (!res.ok) throw new Error("Pokemon não encontrado");

  return res.json();
}

