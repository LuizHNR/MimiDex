"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => window.history.length > 1 && router.back()}
      className="
        px-3 py-1 rounded-lg text-sm font-semibold
        bg-white/10 backdrop-blur-md
        border border-white/20
        hover:bg-white/20
        hover:shadow-[0_0_12px_rgba(255,255,255,0.25)]
        transition
      "


    >
      Voltar
    </button>
  );
}
