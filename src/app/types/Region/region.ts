import { PokemonListItem }  from "@/app/types/Pokemon/pokemon"

export interface Regiao {
  nome: string;
  rotas: Rotas[];
}

export interface Rotas {
  nome: string;
  encounters: Encounters[];

}

export interface Encounters {
  pokemon: PokemonListItem;
  rate: number;
  baseScore: number;
}
