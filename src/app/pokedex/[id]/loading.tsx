import Spinner from "@/components/loading/Spinner"

export default function LoadingPokemon() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      
      <Spinner />

      <p className="mt-4 text-lg opacity-80 animate-pulse">
        Carregando Pokemon...
      </p>
    </div>
  );
}
