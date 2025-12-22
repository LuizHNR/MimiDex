import { PokemonListItem } from "@/app/types/Pokemon/pokemon";
import PokemonCard from "./PokemonCard";

interface PokemonListProps {
  items: PokemonListItem[];
}

export default function PokemonList({ items }: PokemonListProps) {

  // filtro para só aparecer pokemons com sprites
  const filtered = items.filter((p) => p.sprite?.front_default);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 py-10 justify-items-center">
      {filtered.map((pokemon) => (
        <PokemonCard
          key={pokemon.numero}
          numero={pokemon.numero}
          nome={pokemon.nome}
          sprite={pokemon.sprite.front_default}
          tipos={pokemon.tipos}
        />
      ))}
    </div>
  );
}
