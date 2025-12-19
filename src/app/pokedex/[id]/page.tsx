import { getPokedexById } from "@/services/pokemonApi";
import type { Pokedex } from "@/app/types/Pokedex/pokedex";
import Link from "next/link";

import PokedexClient from "@/components/pokedex/PokedexClient";
import BackButton from "@/components/botao/BackButton";

export default async function JogoPage(
  props: { params: Promise<{ id: string }> }
) {
  
  const { id } = await props.params;

  const pokedex: Pokedex = await getPokedexById(id);

  if (!pokedex) {
    return (
      <div className="text-white h-screen flex items-center justify-center">
        <Link href="/">Voltar</Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen transition-colors duration-500 p-4 pb-20">

      <div className="flex items-center gap-4 mb-4">
        <BackButton />
      </div>      

      {/* INFO PRINCIPAL */}
      <p className="text-zinc-200">{pokedex.nome}</p>

      <h1 className="text-3xl font-bold text-white mt-4">
        {pokedex.nome}
      </h1>

      <p className="text-zinc-300 mt-2">
        {pokedex.descricao}
      </p>

      {/* CLIENT — usando o id da rota */}
      <PokedexClient id={id} initialData={pokedex} />

    </main>
  );
}
