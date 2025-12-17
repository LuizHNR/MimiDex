"use client";

import { useEffect, useState } from "react";
import JogosList from "@/components/Jogos/JogosList";
import { getJogos } from "@/services/pokemonApi";
import Spinner from "@/components/loading/Spinner";
import type { JogoList } from "@/app/types/Jogos/Jogo";

export default function JogosPage() {
  const [data, setData] = useState<JogoList[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        // esconder header e footer
        document.body.classList.add("hide-layout");

        const result = await getJogos();
        setData(result);

      } catch {
        setError("Erro ao carregar jogos");
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
      <JogosList items={data} />
    </main>
  );
}