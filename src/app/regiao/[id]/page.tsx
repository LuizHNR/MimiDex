import { getRegiaoById } from "@/services/pokemonApi";
import type { Regiao } from "@/app/types/Region/region";
import Link from "next/link";
import Image from "next/image";

import { TypeBadge } from "@/components/pokemon/TypeBadge"; 
import BackButton from "@/components/botao/BackButton";


export default async function RegiaoPage(
  props: { params: Promise<{ id: string }> }
) {
  const { id } = await props.params;

  const regiao: Regiao = await getRegiaoById(id);

  if (!regiao) {
    return (
      <div className="text-white h-screen flex items-center justify-center">
        <Link href="/">Voltar</Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-4 pb-20">
        <div className="flex items-center gap-4 mb-4">
          <BackButton />

          <h1 className="text-3xl font-bold capitalize">
            Região {regiao.nome}
          </h1>
        </div>

      <div className="mt-8 space-y-8">
        {regiao.rotas.map((rota) => (
          <section key={rota.nome}>
            <h2 className="text-xl font-semibold capitalize mb-4">
              {rota.nome.replaceAll("-", " ")}
            </h2>

            {rota.encounters.length === 0 ? (
              <p className="text-zinc-400">
                Nenhum Pokémon encontrado nesta rota.
              </p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {rota.encounters.map((encounter, index) => {
                  const p = encounter.pokemon;

                  return (
                    <Link
                      key={`${rota.nome}-${p.numero}-${index}`}
                      href={`/pokemon/${p.numero}`}
                      className="bg-zinc-900 rounded-lg p-3 hover:bg-zinc-800 transition"
                    >

                        {p.sprite?.front_default ? (
                        <Image
                            src={p.sprite.front_default}
                            alt={p.nome}
                            width={96}
                            height={96}
                            className="mx-auto"
                        />
                        ) : (
                        <div className="w-24 h-24 mx-auto flex items-center justify-center text-zinc-500 text-xs">
                            Sem imagem
                        </div>
                        )}


                      <p className="text-center font-semibold mt-2">
                        #{p.numero} {p.nome}
                      </p>

                        <div className="flex justify-center gap-2">
                            {p.tipos.map((tipo) => (
                                <TypeBadge key={tipo} tipo={tipo} />
                            ))}
                        </div>

                      <p className="text-xs text-center text-zinc-400">
                        Rate: {encounter.rate}% • Score: {encounter.baseScore}
                      </p>
                    </Link>
                  );
                })}
              </div>
            )}
          </section>
        ))}
      </div>
    </main>
  );
}
