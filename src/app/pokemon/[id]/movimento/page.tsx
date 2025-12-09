export default function MovimentosPage({ params }: { params: { id: string } }) {
  return (
    <div className="text-white p-4">
      <h1>Movimentos do Pokémon {params.id}</h1>
    </div>
  );
}
