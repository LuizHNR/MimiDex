"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

interface Props {
  front: string;
  back: string;
  cryUrl: string;
  nome: string;
}

export default function PokemonSprite({ front, back, cryUrl, nome }: Props) {
  const [isFront, setIsFront] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // cria o audio uma única vez
  useEffect(() => {
    audioRef.current = new Audio(cryUrl);
  }, [cryUrl]);

  function handleClick() {
    // alterna a imagem
    setIsFront((prev) => !prev);

    // toca o som
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  }

  return (
    <Image
      src={isFront ? front : back}
      alt={nome}
      width={220}
      height={220}
      className="mx-auto cursor-pointer transition-transform active:scale-95"
      onClick={handleClick}
    />
  );
}
