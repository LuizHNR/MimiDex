import { typeColors } from "@/utils/typeColors";

export function TypeBadge({ tipo }: { tipo: string }) {
  const color = typeColors[tipo.toLowerCase()] ?? "bg-zinc-700";

  return (
    <span
      className={`${color} text-black px-3 py-1 rounded-full text-sm font-semibold capitalize`}
    >
      {tipo}
    </span>
  );
}
