import Spinner from "./components/Spinner";

export default function Loading() {

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-white gap-6">
      <Spinner />
      <p className="text-lg opacity-80 animate-pulse">Carregando...</p>
    </div>
  );
}
