import { getPokedexById } from "@/services/pokemonApi";
import type { Pokedex } from "@/app/types/Pokedex/pokedex";
import Link from "next/link";
import { TypeBadge } from "@/components/pokemon/TypeBadge";

import PokemonList from "@/components/PokemonList";


export default async function JogoPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  const pokedex: Pokedex = await getPokedexById(id);

  if (!pokedex) {
    return (
      <div className="text-white h-screen flex items-center justify-center">

       <nav className="flex gap-4 text-white font-semibold">
          <Link href="/">
            <button
              className="px-4 py-1 rounded-lg text-white font-semibold shadow-md active:scale-95 transition">
              Voltar
            </button>
          </Link>
        </nav>

        <p className="text-xl opacity-80">
          Este jogo ainda não foi cadastrado!
        </p>
      </div>
    );
  }


  return (
    <main className={`min-h-screen transition-colors duration-500`}>

      <div className="p-4 pb-20">

        {/* INFO PRINCIPAL */}
        <p className="text-zinc-200">{pokedex.nome}</p>



        <h1 className="text-3xl font-bold text-white mt-4">{pokedex.nome}</h1>
        <p className="text-3xl font-bold text-white mt-4">{pokedex.descricao}</p>

        {/* pokemons */}
        <PokemonList items={pokedex.pokemons} />



      </div>

    </main>
  );
}
