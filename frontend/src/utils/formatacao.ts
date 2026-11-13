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
