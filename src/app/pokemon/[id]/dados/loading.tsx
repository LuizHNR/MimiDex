import Spinner from "@/app/components/loading/Spinner"

export default function LoadingDados() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      
      <Spinner />

      <p className="mt-4 text-lg opacity-80 animate-pulse">
        Carregando Dados do Pokemon...
      </p>
    </div>
  );
}
