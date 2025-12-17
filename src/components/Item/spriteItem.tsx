"use client";

import Image from "next/image";
import { useState } from "react";

interface ShakeImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export default function SpriteItem({
  src,
  alt,
  width,
  height,
  className
}: ShakeImageProps) {
  const [shake, setShake] = useState(false);

    // Som pequeno (pode trocar se quiser)
  const sound = typeof Audio !== "undefined"
    ? new Audio("/sounds/click.flac")
    : null;

  function handleClick() {
    setShake(true);
    sound?.play().catch(() => null); // evita erro em autoplay

    // Remove a animação depois que ela termina
    setTimeout(() => setShake(false), 450);
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={220}
      height={220}
      onClick={handleClick}
      className={`pixelated cursor-pointer ${shake ? "animate-shake" : ""}`}
    />
  );
}
