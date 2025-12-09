"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  sprite: {
    front: string;
    back: string;
    front_shiny: string;
    back_shiny: string;
  };
  cryUrl: string;
  nome: string;
}

export default function PokemonSprite({ sprite, cryUrl, nome }: Props) {
  const [isFront, setIsFront] = useState(true);
  const [isShiny, setIsShiny] = useState(false);
  const [shake, setShake] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // cria o audio uma única vez
  useEffect(() => {
  if (!cryUrl) return;

  const audio = new Audio();
  audio.src = cryUrl;

  // aguarda o navegador realmente carregar a fonte
  audio.addEventListener("canplaythrough", () => {
    audioRef.current = audio;
  });

  audio.load();
}, [cryUrl]);


  function handleClick() {
    setIsFront((prev) => !prev);

    // shake animation
    setShake(true);
    setTimeout(() => setShake(false), 500);

    // play cry
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = 0;

    audio.play().catch((err) => {
      console.warn("Erro ao tocar áudio:", err);
    });
  }

  const currentSprite = isShiny
    ? isFront
      ? sprite.front_shiny
      : sprite.back_shiny
    : isFront
    ? sprite.front
    : sprite.back;

  return (
    <div className="flex flex-col items-center pr-20">

      {/* Sprite com animações */}
      <div
        className={`cursor-pointer ${
          shake ? "animate-shake" : ""
        }`}
        onClick={handleClick}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSprite}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.25 }}
          >
            <Image
              src={currentSprite}
              alt={nome}
              width={300}
              height={300}
            />
          </motion.div>
        </AnimatePresence>
      </div>


      {/* Toggle Shiny */}
      <button
        onClick={() => setIsShiny((prev) => !prev)}
        className="px-4 py-1 rounded-lg text-black font-semibold shadow-md active:scale-95 transition">
        {isShiny ? "✨ Shiny" : "★ Normal"}
      </button>
    </div>
  );
}
