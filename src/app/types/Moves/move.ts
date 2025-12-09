export interface PokemonMoves {
  levelUp: Moves[];
  machine: Moves[];
  tutor: Moves[];
  egg: Moves[];
  outros: Moves[];
}

export interface Moves {
  nome: string;
  level: string;
  tipo: string;
  categoria: string;
  poder: number;
  acurracy: number;
  pp: number;
  efeito: string;
  efeitoCurto: string;
  chanceEfeito: number;
}

