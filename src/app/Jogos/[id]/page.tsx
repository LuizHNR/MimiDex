import { getJogoById } from "@/services/pokemonApi";
import type { JogoList } from "@/app/types/Jogos/Jogo";
import Link from "next/link";
import { TypeBadge } from "@/components/pokemon/TypeBadge";

import  JogoHeader  from "@/components/Jogos/HeaderJogo"
import  JogoFooter  from "@/components/Jogos/FooterJogo"

export default async function JogoPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  const jogo: JogoList = await getJogoById(id);

  if (!jogo) {
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

      {/* HEADER DINÂMICO */}
      <JogoHeader id={id} pokedexes={jogo.pokedexes} regioes={jogo.regioes}/>

      <div className="p-4 pb-20">

        {/* INFO PRINCIPAL */}
        <p className="text-zinc-200">{jogo.nome}</p>



        <h1 className="text-3xl font-bold text-white mt-4">{jogo.nome}</h1>
        <p className="text-zinc-200">{jogo.geracao}</p>


        {/* pokedexes */}
        <div className="mt-6">
          <p className="text-white font-semibold">Pokedex</p>
          <div className="flex gap-2 mt-2">
            {jogo.pokedexes.map((tipo) => (
              <TypeBadge key={tipo} tipo={tipo} />
            ))}
          </div>
        </div>



        {/* regioes */}
        <div className="mt-6">
          <p className="text-white font-semibold">Região</p>
          <div className="flex gap-2 mt-2">
            {jogo.regioes.map((tipo) => (
              <TypeBadge key={tipo} tipo={tipo} />
            ))}
          </div>
        </div>



        {/* regioes */}
        <div className="mt-6">
          <p className="text-white font-semibold">Versões</p>
          <div className="flex gap-2 mt-2">
            {jogo.versoes.map((tipo) => (
              <TypeBadge key={tipo} tipo={tipo} />
            ))}
          </div>
        </div>



      </div>

      <JogoFooter />

    </main>
  );
}
