"use client";

import { useState } from "react";

type Props = {
  filters: {
    generations: number[];
    types: string[];
    order: string | null;
  };
  onApply: (filters: {
    generations: number[];
    types: string[];
    order: string | null;
  }) => void;
};

const generations = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const types = [
  "normal", "fire", "water", "electric", "grass", "ice",
  "fighting", "poison", "ground", "flying", "psychic",
  "bug", "rock", "ghost", "dragon", "dark", "steel", "fairy",
];

const orders = [
  { label: "Nada", value: null },
  { label: "A → Z", value: "nameAsc" },
  { label: "Z → A", value: "nameDesc" },
  { label: "Altura", value: "height" },
  { label: "Peso", value: "weight" },
  { label: "Maior Status", value: "statusDesc" },
  { label: "Menor Status", value: "statusAsc" },
  { label: "Ataque", value: "attack" },
  { label: "Defesa", value: "defense" },
  { label: "Sp. Ataque", value: "sp_attack" },
  { label: "Sp. Defesa", value: "sp_defense" },
  { label: "Velocidade", value: "speed" },
];

export default function AdvancedFilter({ filters, onApply }: Props) {
  const [open, setOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters);

  function toggleGen(gen: number) {
    setLocalFilters(prev => ({
      ...prev,
      generations: prev.generations.includes(gen)
        ? prev.generations.filter(g => g !== gen)
        : [...prev.generations, gen],
    }));
  }

  function toggleType(type: string) {
    setLocalFilters(prev => ({
      ...prev,
      types: prev.types.includes(type)
        ? prev.types.filter(t => t !== type)
        : [...prev.types, type],
    }));
  }

  function apply() {
    onApply(localFilters);
    setOpen(false);
  }

  return (
    <div className="w-full max-w-4xl mx-auto mb-6">
      {/* BOTÃO */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between bg-zinc-800 px-4 py-3 rounded-md text-sm"
      >
        <span>Filtro Avançado</span>
        <span className={`transition ${open ? "rotate-180" : ""}`}>⌄</span>
      </button>

      {/* PAINEL */}
      {open && (
        <div className="bg-zinc-700 mt-2 p-6 rounded-md space-y-8">
          
          {/* GERAÇÕES */}
          <section>
            <h3 className="text-center mb-3 text-sm opacity-70">Gerações</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {generations.map(gen => (
                <button
                  key={gen}
                  onClick={() => toggleGen(gen)}
                  className={`px-3 py-1 rounded border text-xs
                    ${
                      localFilters.generations.includes(gen)
                        ? "bg-emerald-600 border-emerald-600"
                        : "border-zinc-400"
                    }`}
                >
                  Gen {gen}
                </button>
              ))}
            </div>
          </section>

          {/* TIPOS */}
          <section>
            <h3 className="text-center mb-3 text-sm opacity-70">Tipos</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {types.map(type => (
                <button
                  key={type}
                  onClick={() => toggleType(type)}
                  className={`px-3 py-1 rounded border text-xs capitalize
                    ${
                      localFilters.types.includes(type)
                        ? "bg-emerald-600 border-emerald-600"
                        : "border-zinc-400"
                    }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </section>

          {/* ORDENAR */}
          <section>
            <h3 className="text-center mb-3 text-sm opacity-70">Organizar</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {orders.map(o => (
                <button
                  key={o.label}
                  onClick={() =>
                    setLocalFilters(prev => ({ ...prev, order: o.value }))
                  }
                  className={`px-3 py-1 rounded border text-xs
                    ${
                      localFilters.order === o.value
                        ? "bg-emerald-600 border-emerald-600"
                        : "border-zinc-400"
                    }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </section>

          {/* APLICAR */}
          <button
            onClick={apply}
            className="w-full mt-4 py-2 rounded border border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-black transition"
          >
            Aplicar
          </button>
        </div>
      )}
    </div>
  );
}
