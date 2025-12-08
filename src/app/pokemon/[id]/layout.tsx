import "@/app/globals.css";
import HeaderPokemon from "@/app/components/HeaderPokemon";
import FooterPokemon from "@/app/components/FooterPokemon";

export default function PokemonLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <HeaderPokemon />
      {children}
      <FooterPokemon />
    </div>
  );
}
