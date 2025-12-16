export interface PokemonSprite {
  front_default: string;
  back_default: string;
  front_shiny: string;
  back_shiny: string;
}

export interface PokemonListItem {
  numero: number;
  nome: string;
  tipos: string[];
  sprite: PokemonSprite;
  links: {
    self: string;
  };
}

export interface PokemonHabilidade {
  nome: string;
  descricao: string;
}

export interface PokemonStat {
  nome: string;
  valor: number;
}

export interface Multipliers {
  fraquezas: Record<string, number>;
  resistencias: Record<string, number>;
  imunidades: Record<string, number>;
}

export interface PokemonEvolucao {
  numero: number;
  nome: string;
  nivelParaEvoluir: number | null;
  links: {
    self: string;
  };
}

export interface PokemonDetails extends PokemonListItem {
  descricao: string;
  cryUrl: string;
  altura: string;
  peso: string;
  habilidades: PokemonHabilidade[];
  eggGroups: string[];
  multipliers: Multipliers;
  evolucoes: PokemonEvolucao[];
  baseStatus: number;
  stats: PokemonStat[];
}


