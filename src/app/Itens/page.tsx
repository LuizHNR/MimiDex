"use client";

import { useEffect, useState } from "react";
import ItensList from "../components/Item/ItensList";
import { getItemPage } from "@/services/pokemonApi";
import Spinner from "../components/loading/Spinner";
import type { ListItem } from "@/app/types/Item/item";

export default function Itens() {
  const [data, setData] = useState<ListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        // esconder header e footer
        document.body.classList.add("hide-layout");

        const result = await getItemPage();
        setData(result);

      } catch {
        setError("Erro ao carregar itens");
      } finally {
        setLoading(false);

        // mostrar header e footer
        document.body.classList.remove("hide-layout");
      }
    }

    load();
  }, []);

  if (loading)
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-black text-white gap-6">
        <Spinner />
        <p className="text-lg opacity-80 animate-pulse">Carregando...</p>
      </div>
    );


  if (error) return <div className="text-red-400">{error}</div>;
  if (!data.length) return <div className="text-white">Nenhum item</div>;

  return (
    <main className="text-white bg-black p-12">
      <ItensList items={data} />
    </main>
  );
}
