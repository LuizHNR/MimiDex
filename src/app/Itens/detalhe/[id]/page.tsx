import { getItemById } from "@/services/pokemonApi";
import type { ListItem } from "@/app/types/Item/item";
import Image from "next/image";
import Link from "next/link";

import SpriteItem from "@/components/Item/spriteItem";
import BackButton from "@/components/botao/BackButton";


export default async function ItemPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  const item: ListItem = await getItemById(id);

  if (!item) {
    return (
      <div className="text-white h-screen flex items-center justify-center"> 

      <div className="flex items-center ">
        <BackButton />

      </div> 

       <nav className="flex gap-4 text-white font-semibold">
          <Link href="/">
            <button
              className="px-4 py-1 rounded-lg text-white font-semibold shadow-md active:scale-95 transition">
              Voltar
            </button>
          </Link>
        </nav>

        <p className="text-xl opacity-80">
          Este item ainda não foi cadastrado na Pokédex!
        </p>
      </div>
    );
  }



  return (
    <main className={`min-h-screen transition-colors duration-500`}>

      <div className="flex items-center gap-4 mb-4">
        <BackButton />

      </div>       

      <div className="p-4 pb-20">

        {/* INFO PRINCIPAL */}
        <p className="text-zinc-200">{item.nome}</p>

      <SpriteItem
            src={item.sprite}
            alt={item.nome}
            width={220}
            height={220}
            className="pixelated cursor-pointer"
        />     


        {/* DESCRIÇÃO */}
        <div className="mt-6">
          <p className="text-white font-semibold">Descrição</p>
          <p className="text-zinc-100">{item.efeito}</p>
        </div>


      </div>

    </main>
  );
}
