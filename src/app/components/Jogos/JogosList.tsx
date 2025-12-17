import type { JogoList } from "@/app/types/Jogos/Jogo";
import JogosCard from "./JogosCard";

interface ItemListProps {
  items: JogoList[];
}

export default function JogosList({ items }: { items: JogoList[] }) {

  const jogosComRegiao = items.filter(
    jogo => jogo.regioes && jogo.regioes.length > 0
  );

  if (!jogosComRegiao.length) {
    return (
      <p className="text-zinc-400 text-center">
        Nenhum jogo com regiões disponíveis
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4 py-10">
      {jogosComRegiao.map((jogo, index) => (
        <JogosCard
          key={index}
          nome={jogo.nome}
          geracao={jogo.geracao}
          pokedexes={jogo.pokedexes}
          regioes={jogo.regioes}
          vercoes={jogo.vercoes}
        />
      ))}
    </div>
  );

}
