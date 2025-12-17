"use client";

export default function PokemonFooter({ color }: { color: string }) {
  return (
    <footer
      className={`${color} text-white p-3 text-center transition-colors duration-500`}
    >
      <p className="text-sm">Mimidex • Página do Pokémon</p>
    </footer>
  );
}
