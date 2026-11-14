import { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { Aluno } from '../types/aluno';
import { formatarData, formatarTelefone, iniciais } from '../utils/formatacao';
import { Modal } from './Modal';

interface DetalhesAlunoProps {
  alunoId: string;
  onFechar: () => void;
}

interface LinhaDetalheProps {
  rotulo: string;
  valor: string;
  copiavel?: boolean;
  mono?: boolean;
}

// Uma linha "rótulo + valor", com botão de copiar opcional
function LinhaDetalhe({ rotulo, valor, copiavel = false, mono = false }: LinhaDetalheProps) {
  const [copiado, setCopiado] = useState(false);

  async function copiar() {
    try {
      await navigator.clipboard.writeText(valor);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      // Se o navegador bloquear a área de transferência, não faz nada
    }
  }

  return (
    <div className="flex items-start justify-between gap-4 border-b border-gray-100 py-3 last:border-0">
      <div className="min-w-0">
        <dt className="text-xs font-semibold uppercase tracking-wider text-marca-cinza">{rotulo}</dt>
        <dd className={`mt-1 font-medium [overflow-wrap:anywhere] ${mono ? 'font-mono text-sm' : ''}`}>{valor}</dd>
      </div>
      {copiavel && (
        <button
          type="button"
          onClick={copiar}
          aria-label={`Copiar ${rotulo.toLowerCase()}`}
          className={`min-h-11 shrink-0 rounded-full border px-4 text-sm font-medium transition ${
            copiado
              ? 'border-marca-menta bg-marca-menta text-marca-escuro'
              : 'border-indigo-100 text-marca-azul hover:bg-indigo-50'
          }`}
        >
          {copiado ? 'Copiado!' : 'Copiar'}
        </button>
      )}
    </div>
  );
}

export function DetalhesAluno({ alunoId, onFechar }: DetalhesAlunoProps) {
  const [aluno, setAluno] = useState<Aluno | null>(null);
  const [erro, setErro] = useState('');

  // Busca o aluno na API (rota GET /alunos/:id) quando o modal abre
  useEffect(() => {
    let ativo = true; // evita atualizar o estado se o modal já foi fechado
    api
      .get<Aluno>(`/alunos/${alunoId}`)
      .then((resposta) => {
        if (ativo) setAluno(resposta.data);
      })
      .catch(() => {
        if (ativo) setErro('Não foi possível carregar os dados do aluno.');
      });
    return () => {
      ativo = false;
    };
  }, [alunoId]);

  return (
    <Modal titulo="Detalhes do aluno" onFechar={onFechar}>
      {!aluno && !erro && <p className="text-marca-cinza">Carregando...</p>}

      {erro && <p className="rounded-2xl bg-red-50 px-5 py-4 font-medium text-marca-rosa-escuro">{erro}</p>}

      {aluno && (
        <>
          <div className="mb-4 flex items-center gap-4">
            <span
              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-lg font-semibold ${
                aluno.ativo ? 'bg-marca-azul text-white' : 'bg-indigo-100 text-marca-roxo'
              }`}
            >
              {iniciais(aluno.nome)}
            </span>
            <div className="min-w-0">
              <p className="text-lg font-bold [overflow-wrap:anywhere]">{aluno.nome}</p>
              <span
                className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                  aluno.ativo ? 'bg-marca-menta text-marca-escuro' : 'bg-pink-100 text-marca-rosa-escuro'
                }`}
              >
                {aluno.ativo ? 'Ativo' : 'Inativo'}
              </span>
            </div>
          </div>

          <dl>
            <LinhaDetalhe rotulo="ID" valor={aluno._id} copiavel mono />
            <LinhaDetalhe rotulo="Nome" valor={aluno.nome} copiavel />
            <LinhaDetalhe rotulo="Email" valor={aluno.email} copiavel />
            <LinhaDetalhe
              rotulo="Telefone"
              valor={aluno.telefone ? formatarTelefone(aluno.telefone) : '—'}
              copiavel={Boolean(aluno.telefone)}
            />
            <LinhaDetalhe rotulo="Curso" valor={aluno.curso} />
            <LinhaDetalhe rotulo="Cadastrado em" valor={formatarData(aluno.criado_em)} />
            <LinhaDetalhe rotulo="Última atualização" valor={formatarData(aluno.atualizado_em)} />
          </dl>
        </>
      )}
    </Modal>
  );
}
