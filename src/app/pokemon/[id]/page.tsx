import { getPokemonById } from "@/services/pokemonApi";
import type { PokemonDetails } from "@/app/types/Pokemon/pokemon";
import Image from "next/image";
import Link from "next/link";
import { TypeBadge } from "@/components/pokemon/TypeBadge";
import { typeBgColors } from "@/utils/typeBgColors";
import EvolutionChain from "@/components/pokemon/EvolutionChain";


import PokemonHeader from "@/components/pokemon/HeaderPokemon";
import PokemonFooter from "@/components/pokemon/FooterPokemon";

import PokemonSprite from "@/components/pokemon/PokemonSprite";


export default async function PokemonPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  const pokemon: PokemonDetails = await getPokemonById(id);

  if (!pokemon) {
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
          Este Pokémon ainda não foi cadastrado na Pokédex!
        </p>
      </div>
    );
  }

  const tipoPrincipal = pokemon.tipos[0].toLowerCase();
  const bgColor = typeBgColors[tipoPrincipal] ?? "bg-zinc-900";
  

  return (
    <main className={`${bgColor} min-h-screen transition-colors duration-500`}>

      {/* HEADER DINÂMICO */}
      <PokemonHeader color={bgColor} id={id} />

      <div className="p-4 pb-20">

        {/* INFO PRINCIPAL */}
        <p className="text-zinc-200">#{pokemon.numero}</p>

        <PokemonSprite
          nome={pokemon.nome}
          cryUrl={pokemon.cryUrl}
          sprite={{
            front: pokemon.sprite.front_default,
            back: pokemon.sprite.back_default,
            front_shiny: pokemon.sprite.front_shiny,
            back_shiny: pokemon.sprite.back_shiny
          }}
        />



        <h1 className="text-3xl font-bold text-white mt-4">{pokemon.nome}</h1>
        <p className="text-zinc-200">#{pokemon.numero}</p>

        {/* DESCRIÇÃO */}
        <div className="mt-6">
          <p className="text-white font-semibold">Descrição</p>
          <p className="text-zinc-100">{pokemon.descricao}</p>
        </div>

        {/* TIPOS */}
        <div className="mt-6">
          <p className="text-white font-semibold">Tipo(s)</p>
          <div className="flex gap-2 mt-2">
            {pokemon.tipos.map((tipo) => (
              <TypeBadge key={tipo} tipo={tipo} />
            ))}
          </div>
        </div>

        {/* ALTURA E PESO */}
        <div className="mt-6">
          <p className="text-white font-semibold">Altura & Peso</p>
          <p className="text-zinc-100">{pokemon.altura} • {pokemon.peso}</p>
        </div>



        {/* EVOLUÇÕES */}
        <div className="mt-10">
          <p className="text-white font-semibold text-lg">Evoluções</p>

          <div className="mt-10">
            <p className="text-white font-semibold text-lg">Evoluções</p>
            <EvolutionChain evolucoes={pokemon.evolucoes} />
          </div>

        </div>


        {/* FORMAS */}
        <div className="mt-10">
          <p className="text-white font-semibold text-lg">Formas</p>

          <div className="flex flex-col gap-6 mt-4">
            {pokemon.formas
              .filter((fm) => fm.sprite?.front_default) // 🔥 remove quem não tem imagem
              .map((fm) => (
                <a
                  key={fm.numero}
                  href={`/pokemon/${fm.numero}`}
                  className="flex items-center gap-4 bg-white/20 p-3 rounded-lg backdrop-blur-sm transition hover:bg-white/30"
                >
                  <Image
                    src={fm.sprite.front_default}
                    alt={fm.nome}
                    width={60}
                    height={60}
                    className="pixelated"
                  />

                  <div>
                    <p className="text-white font-bold">{fm.nome}</p>
                  </div>
                </a>
            ))}

          </div>
        </div>

      </div>

      <PokemonFooter color={bgColor} />

    </main>
  );
}
