import type { Aluno } from '../types/aluno';
import { formatarTelefone, iniciais } from '../utils/formatacao';

interface ListaAlunosProps {
  alunos: Aluno[];
  mensagemVazia?: string;
  onVerDetalhes?: (aluno: Aluno) => void;
  onEditar?: (aluno: Aluno) => void;
  onExcluir?: (aluno: Aluno) => void;
}

// Pedaços reaproveitados na tabela (computador) e nos cards (celular)

function Avatar({ aluno }: { aluno: Aluno }) {
  return (
    <span
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
        aluno.ativo ? 'bg-marca-azul text-white' : 'bg-indigo-100 text-marca-roxo'
      }`}
    >
      {iniciais(aluno.nome)}
    </span>
  );
}

function SeloStatus({ ativo }: { ativo: boolean }) {
  return (
    <span
      className={`inline-block shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
        ativo ? 'bg-marca-menta text-marca-escuro' : 'bg-pink-100 text-marca-rosa-escuro'
      }`}
    >
      {ativo ? 'Ativo' : 'Inativo'}
    </span>
  );
}

interface BotoesAcoesProps {
  aluno: Aluno;
  onEditar?: (aluno: Aluno) => void;
  onExcluir?: (aluno: Aluno) => void;
}

function BotoesAcoes({ aluno, onEditar, onExcluir }: BotoesAcoesProps) {
  return (
    <div className="flex justify-center gap-2">
      <button
        type="button"
        onClick={() => onEditar?.(aluno)}
        title="Editar"
        aria-label={`Editar ${aluno.nome}`}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-marca-roxo text-marca-roxo transition hover:bg-marca-roxo hover:text-white"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => onExcluir?.(aluno)}
        title="Excluir"
        aria-label={`Excluir ${aluno.nome}`}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-marca-rosa-escuro text-marca-rosa-escuro transition hover:bg-marca-rosa-escuro hover:text-white"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
          <path d="M10 11v6" />
          <path d="M14 11v6" />
          <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
        </svg>
      </button>
    </div>
  );
}

export function ListaAlunos({
  alunos,
  mensagemVazia = 'Nenhum aluno cadastrado ainda.',
  onVerDetalhes,
  onEditar,
  onExcluir,
}: ListaAlunosProps) {
  if (alunos.length === 0) {
    return (
      <div className="rounded-2xl bg-white px-6 py-12 text-center shadow-sm">
        <p className="text-marca-cinza">{mensagemVazia}</p>
      </div>
    );
  }

  return (
    <>
      {/* CELULAR E TABLET: um card por aluno (some a partir de telas grandes) */}
      <ul className="flex flex-col gap-3 lg:hidden">
        {alunos.map((aluno) => (
          <li key={aluno._id} className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => onVerDetalhes?.(aluno)}
                title="Ver detalhes"
                className="flex min-h-11 min-w-0 items-center gap-3 text-left"
              >
                <Avatar aluno={aluno} />
                <span className="truncate font-semibold">{aluno.nome}</span>
              </button>
              <SeloStatus ativo={aluno.ativo} />
            </div>

            <div className="mt-2 flex flex-col gap-0.5 text-sm text-[#4A4E68]">
              <span className="truncate">{aluno.email}</span>
              <span className="truncate">{aluno.curso}</span>
              <span className="truncate">{aluno.telefone ? formatarTelefone(aluno.telefone) : 'Sem telefone'}</span>
            </div>

            <div className="mt-3 flex justify-end">
              <BotoesAcoes aluno={aluno} onEditar={onEditar} onExcluir={onExcluir} />
            </div>
          </li>
        ))}
      </ul>

      {/* TELAS GRANDES: tabela com largura fixa por coluna (nunca precisa de rolagem lateral) */}
      <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm lg:block">
        <table className="w-full table-fixed border-collapse text-left">
          <thead>
            <tr className="bg-[#F4F5F5] text-sm text-marca-cinza">
              <th className="w-[29%] px-4 py-3.5 font-semibold">Nome</th>
              <th className="w-[28%] px-4 py-3.5 font-semibold">Email</th>
              <th className="w-[15%] px-4 py-3.5 font-semibold">Curso</th>
              <th className="w-[15%] px-4 py-3.5 font-semibold">Telefone</th>
              <th className="w-[13%] px-4 py-3.5 text-center font-semibold">Ações</th>
            </tr>
          </thead>
          <tbody className="text-[15px]">
            {alunos.map((aluno) => (
              <tr key={aluno._id} className="border-t border-gray-100">
                <td className="px-4 py-3">
                  {/* Clicar no nome abre os detalhes; o status fica embaixo do nome */}
                  <button
                    type="button"
                    onClick={() => onVerDetalhes?.(aluno)}
                    title="Ver detalhes"
                    className="group flex w-full min-w-0 items-center gap-3 text-left"
                  >
                    <Avatar aluno={aluno} />
                    <span className="flex min-w-0 flex-col items-start gap-1">
                      <span className="block w-full truncate font-semibold group-hover:text-marca-azul group-hover:underline">
                        {aluno.nome}
                      </span>
                      <SeloStatus ativo={aluno.ativo} />
                    </span>
                  </button>
                </td>
                <td className="px-4 py-3 text-[#4A4E68]">
                  <span title={aluno.email} className="block truncate">
                    {aluno.email}
                  </span>
                </td>
                <td className="px-4 py-3 text-[#4A4E68]">
                  <span title={aluno.curso} className="block truncate">
                    {aluno.curso}
                  </span>
                </td>
                <td className="px-4 py-3 text-[#4A4E68]">
                  <span className="block truncate">
                    {aluno.telefone ? formatarTelefone(aluno.telefone) : '—'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <BotoesAcoes aluno={aluno} onEditar={onEditar} onExcluir={onExcluir} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}