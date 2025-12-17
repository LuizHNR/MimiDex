import type { Moves } from "@/app/types/Moves/move";

export function MoveGroup({ title, list }: { title: string; list: Moves[] }) {
  if (!list || list.length === 0) return null;

  return (
    <section>
      <h2 className="text-2xl font-bold text-white mb-3">{title}</h2>

      <div className="space-y-3">
        {list.map((m, i) => (
          <div
            key={i}
            className="bg-black/20 p-3 rounded-xl border border-white/10 backdrop-blur"
          >
            <div className="flex justify-between">
              <h3 className="text-white font-semibold">{m.nome}</h3>
              {m.level && (
                <span className="text-yellow-300">Lv. {m.level}</span>
              )}
            </div>

            <div className="flex gap-2 mt-1">
              <span className="text-xs px-2 py-1 rounded bg-white/10 text-white">
                {m.tipo}
              </span>

              <span className="text-xs px-2 py-1 rounded bg-white/10 text-zinc-300">
                {m.categoria}
              </span>
            </div>

            <div className="text-zinc-300 text-sm mt-2 space-y-1">
              <p><strong>Poder:</strong> {m.poder ?? "-"}</p>
              <p><strong>Acurácia:</strong> {m.acurracy ?? "-"}</p>
              <p><strong>PP:</strong> {m.pp}</p>
              <p><strong>Efeito:</strong> {m.efeitoCurto}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
