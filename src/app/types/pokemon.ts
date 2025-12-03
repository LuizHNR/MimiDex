// Tipo para o sprite
export interface PokemonSprite {
  front_default: string;
  back_default?: string;
  front_shiny?: string;
  back_shiny?: string;
}

// Tipo básico para o GET ALL
export interface PokemonListItem {
  numero: number;
  nome: string;
  tipos: string[];
  sprite: PokemonSprite;
  links?: {
    self: string;
  };
}

// Tipo completo (para getPokemonById)
export interface PokemonDetails extends PokemonListItem {
  habilidades?: string[];
  altura?: number;
  peso?: number;
}
