import { ListItem } from "@/app/types/Item/item";
import ItensCard from "./ItensCard";

interface ItemListProps {
  items: ListItem[];
}

export default function ItemList({ items }: ItemListProps) {

  // Mostrar apenas itens com sprite e com descrição (efeito)
  const filtered = items.filter(p => p.efeito && p.sprite);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 py-10">
      {filtered.map((ItensPoke, index) => (
        <ItensCard
          key={index}
          nome={ItensPoke.nome}
          sprite={ItensPoke.sprite}
          efeito={ItensPoke.efeito}
        />
      ))}
    </div>
  );
}
