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
  const shinyAudioRef = useRef<HTMLAudioElement | null>(null);

  /* shiny sound */
  useEffect(() => {
    shinyAudioRef.current = new Audio("/sounds/shiny.wav");
  }, []);

  /* cry */
  useEffect(() => {
    if (!cryUrl) return;

    const audio = new Audio(cryUrl);
    audioRef.current = audio;
  }, [cryUrl]);

  /* verifica se existe back */
  const hasBack =
    !!sprite.back?.trim() || !!sprite.back_shiny?.trim();

  function handleClick() {
    if (!isFront && !hasBack) return;

    if (isFront && !hasBack) {
      playCry();
      triggerShake();
      return;
    }

    setIsFront((prev) => !prev);
    triggerShake();
    playCry();
  }

  function triggerShake() {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  }

  function playCry() {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = 0;
    audio.play().catch(() => {});
  }

  function handleToggleShiny() {
    setIsShiny((prev) => !prev);

    shinyAudioRef.current?.play().catch(() => {});
  }

  /* garante sprite válido */
  const currentSprite =
    isShiny
      ? isFront
        ? sprite.front_shiny || sprite.front
        : sprite.back_shiny || sprite.front_shiny || sprite.front
      : isFront
      ? sprite.front
      : sprite.back || sprite.front;

  // segurança final
  if (!currentSprite) return null;

  return (
    <div className="flex flex-col items-center pr-20">
      {/* Sprite */}
      <div
        className={`cursor-pointer ${shake ? "animate-shake" : ""}`}
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
              className="pixelated"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Toggle Shiny */}
      <button
        onClick={handleToggleShiny}
        className="px-4 py-1 rounded-lg text-black font-semibold shadow-md active:scale-95 transition"
      >
        {isShiny ? "✨ Shiny" : "★ Normal"}
      </button>
    </div>
  );
}
