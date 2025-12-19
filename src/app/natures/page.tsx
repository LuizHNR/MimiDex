import { getNatures } from "@/services/pokemonApi";
import type { Nature } from "@/app/types/Nature/nature";
import Link from "next/link";

function statLabel(stat: string) {
  if (stat === "none") return "Neutra";
  return stat.replace("-", " ");
}

function statColor(stat: string) {
  switch (stat) {
    case "attack":
      return "text-red-400";
    case "defense":
      return "text-blue-400";
    case "special-attack":
      return "text-purple-400";
    case "special-defense":
      return "text-indigo-400";
    case "speed":
      return "text-yellow-400";
    default:
      return "text-zinc-400";
  }
}

export default async function NaturesPage() {
  const natures: Nature[] = await getNatures();

  if (!natures) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        <p>Erro ao carregar Natures</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-6 pb-24">
      {/* TÍTULO */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Natures</h1>
        <p className="text-zinc-400 mt-1">
          Cada Nature altera os atributos de um Pokémon
        </p>
      </div>

      <div className="grid gap-4">
        {natures.map((nature) => {
          const isNeutral =
            nature.aumenta === "none" && nature.diminui === "none";

          return (
            <div
              key={nature.nome}
              className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-4 hover:border-zinc-600 transition backdrop-blur"
            >
              {/* NOME */}
              <h2 className="text-xl font-semibold capitalize mb-2">
                {nature.nome}
              </h2>

              {/* CONTEÚDO */}
              {isNeutral ? (
                <p className="text-zinc-400 text-sm">
                  Nature neutra — não altera atributos
                </p>
              ) : (
                <div className="space-y-1 text-sm">
                  <p>
                    <span className="text-green-400 font-semibold">▲ Aumenta:</span>{" "}
                    <span className={statColor(nature.aumenta)}>
                      {statLabel(nature.aumenta)}
                    </span>
                  </p>

                  <p>
                    <span className="text-red-400 font-semibold">▼ Diminui:</span>{" "}
                    <span className={statColor(nature.diminui)}>
                      {statLabel(nature.diminui)}
                    </span>
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
