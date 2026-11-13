export interface Aluno {
  _id: string;
  nome: string;
  email: string;
  telefone?: string;
  curso: string;
  ativo: boolean;
  criado_em: string;
  atualizado_em: string;
}
