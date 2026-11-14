import type { Aluno } from '../types/aluno';
import { formatarTelefone, iniciais } from '../utils/formatacao';

interface ListaAlunosProps {
  alunos: Aluno[];
  mensagemVazia?: string;
  onVerDetalhes?: (aluno: Aluno) => void;
  onEditar?: (aluno: Aluno) => void;
  onExcluir?: (aluno: Aluno) => void;
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
    <div className="overflow-x-auto rounded-2xl bg-white shadow-sm">
      <table className="w-full min-w-[760px] border-collapse text-left">
        <thead>
          <tr className="bg-[#F4F5F5] text-sm text-marca-cinza">
            <th className="px-5 py-3.5 font-semibold">Nome</th>
            <th className="px-5 py-3.5 font-semibold">Email</th>
            <th className="px-5 py-3.5 font-semibold">Curso</th>
            <th className="px-5 py-3.5 font-semibold">Telefone</th>
            <th className="px-5 py-3.5 font-semibold">Status</th>
            <th className="sticky right-0 bg-[#F4F5F5] px-5 py-3.5 text-center font-semibold">Ações</th>
          </tr>
        </thead>
        <tbody className="text-[15px]">
          {alunos.map((aluno) => (
            <tr key={aluno._id} className="border-t border-gray-100">
              <td className="px-5 py-3.5">
                {/* Clicar no nome abre os detalhes */}
                <button
                  type="button"
                  onClick={() => onVerDetalhes?.(aluno)}
                  title="Ver detalhes"
                  className="group flex min-h-11 items-center gap-3 text-left"
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                      aluno.ativo ? 'bg-marca-azul text-white' : 'bg-indigo-100 text-marca-roxo'
                    }`}
                  >
                    {iniciais(aluno.nome)}
                  </span>
                  <span className="block max-w-[200px] truncate font-semibold group-hover:text-marca-azul group-hover:underline">
                    {aluno.nome}
                  </span>
                </button>
              </td>
              <td className="px-5 py-3.5 text-[#4A4E68]">
                <span title={aluno.email} className="block max-w-[220px] truncate">
                  {aluno.email}
                </span>
              </td>
              <td className="px-5 py-3.5 text-[#4A4E68]">
                <span title={aluno.curso} className="block max-w-[160px] truncate">
                  {aluno.curso}
                </span>
              </td>
              <td className="whitespace-nowrap px-5 py-3.5 text-[#4A4E68]">
                {aluno.telefone ? formatarTelefone(aluno.telefone) : '—'}
              </td>
              <td className="px-5 py-3.5">
                <span
                  className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                    aluno.ativo ? 'bg-marca-menta text-marca-escuro' : 'bg-pink-100 text-marca-rosa-escuro'
                  }`}
                >
                  {aluno.ativo ? 'Ativo' : 'Inativo'}
                </span>
              </td>
              {/* Coluna fixa na direita: fica visível mesmo com rolagem horizontal */}
              <td className="sticky right-0 bg-white px-5 py-3.5 shadow-[-8px_0_8px_-8px_rgba(0,0,0,0.12)]">
                <div className="flex justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => onEditar?.(aluno)}
                    title="Editar"
                    aria-label={`Editar ${aluno.nome}`}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-marca-roxo text-marca-roxo transition hover:bg-marca-roxo hover:text-white"
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
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-marca-rosa-escuro text-marca-rosa-escuro transition hover:bg-marca-rosa-escuro hover:text-white"
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}