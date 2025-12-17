import Link from "next/link";

interface JogosCardProps {
  id: number;
  nome: string;
  geracao: string;
  pokedexes?: string[];
  regioes?: string[];
  versoes?: string[];
}

export default function JogosCard({
  id,
  nome,
  geracao,
  pokedexes = [],
  regioes = [],
  versoes = [],
}: JogosCardProps) {

  return (
    <Link href={`/Jogo/${id}`}
      className="
        w-full
        bg-zinc-900/90 border border-zinc-800
        rounded-2xl
        p-4 sm:p-6
        flex flex-col sm:flex-row
        gap-4 sm:gap-6
        hover:border-emerald-500
        hover:shadow-lg hover:shadow-emerald-500/10
        transition
      "
    >

      {/* BLOCO DIREITO — CONTEÚDO */}
      <div className="flex flex-col justify-between flex-1 gap-3">
        {/* TÍTULO */}
        <div>
          <h2 className="text-lg font-bold capitalize text-white">
            {nome.replace("-", " ")}
          </h2>
          <span className="text-xs text-zinc-400 uppercase tracking-wide">
            {geracao}
          </span>
        </div>

        {/* REGIÕES */}
        {regioes.length > 0 && (
          <div>
            <p className="text-xs text-zinc-500 mb-1">Regiões</p>
            <div className="flex flex-wrap gap-2">
              {regioes.map(r => (
                <span
                  key={r}
                  className="
                    text-xs px-3 py-1 rounded-full
                    bg-emerald-500/10 text-emerald-400
                    hover:border-emerald-500
                    hover:text-zinc-300
                    border border-emerald-500/20
                  "
                >
                  {r}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* POKEDEX */}
        {pokedexes.length > 0 && (
          <div>
            <p className="text-xs text-zinc-500 mb-1">Pokédex</p>
            <div className="flex flex-wrap gap-2">
              {pokedexes.map(p => (
                <span
                  key={p}
                  className="
                    text-xs px-3 py-1 rounded-md
                    bg-zinc-800 text-zinc-300
                    hover:border-emerald-500
                    hover:text-emerald-500
                    border border-zinc-700
                  "
                >
                  Pokédex — {p}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* VERSÕES */}
        {versoes.length > 0 && (
          <p className="text-xs text-zinc-400">
            {versoes.slice(0, 4).join(", ")}
            {versoes.length > 4 && (
              <span className="text-zinc-500">
                {" "}+{versoes.length - 4}
              </span>
            )}
          </p>
        )}
      </div>
    </Link>
  );
}
