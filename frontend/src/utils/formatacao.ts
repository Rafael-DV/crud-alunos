// Converte a data em UTC (como vem da API) para o horário de Brasília
export function formatarData(data: string) {
  return new Date(data).toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    dateStyle: 'short',
    timeStyle: 'short',
  });
}

// Iniciais do primeiro e do último nome, como no Teams: "Maria da Silva" → "MS"
export function iniciais(nome: string) {
  const partes = nome.trim().split(/\s+/);
  const primeira = partes[0].charAt(0);
  const ultima = partes.length > 1 ? partes[partes.length - 1].charAt(0) : '';
  return (primeira + ultima).toUpperCase();
}

export function mascaraTelefone(valor: string) {
  if (valor.trim().startsWith('+')) {
    return '+' + valor.replace(/\D/g, '').slice(0, 15);
  }
  const d = valor.replace(/\D/g, '').slice(0, 11);
  if (d.length === 0) return '';
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export function formatarTelefone(telefone: string) {
  if (telefone.startsWith('+55')) return mascaraTelefone(telefone.slice(3));
  return telefone;
}