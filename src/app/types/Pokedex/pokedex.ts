import { PokemonListItem }  from "@/app/types/Pokemon/pokemon"

export interface Pokedex {
  nome: string;
  descricao: string;
  pokemons: PokemonDetails[]
}

export interface PokemonDetails extends PokemonListItem {
  numeroRegional: number;

}

