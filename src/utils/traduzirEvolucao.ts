export function traduzirEvolucao(ev: {
  nivelParaEvoluir: number | null;
  metodo?: string | null;
  detalhe?: string | null;
}) {
  // Evolução por nível
  if (ev.nivelParaEvoluir !== null) {
    return `Evolui no nível ${ev.nivelParaEvoluir}`;
  }

  // Evolução por outro método (item, trade, etc)
  if (ev.detalhe) {
    return ev.detalhe.replace(/_/g, " ");
  }

  if (ev.metodo) {
    return ev.metodo.replace(/_/g, " ");
  }

  return "Evolução especial";
}
