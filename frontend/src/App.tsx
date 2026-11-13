import { useEffect, useState } from 'react';
import { api } from './services/api';
import type { Aluno } from './types/aluno';
import { ListaAlunos } from './components/ListaAlunos';
import { DetalhesAluno } from './components/DetalhesAluno';

function App() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [busca, setBusca] = useState('');
  const [alunoDetalheId, setAlunoDetalheId] = useState<string | null>(null);

  // Busca a lista na API (GET /alunos) quando a página abre
  useEffect(() => {
    let ativo = true; // evita atualizar o estado se o componente já saiu da tela
    api
      .get<Aluno[]>('/alunos')
      .then((resposta) => {
        if (ativo) setAlunos(resposta.data);
      })
      .catch(() => {
        if (ativo) setErro('Não foi possível carregar os alunos. Verifique se a API está rodando.');
      })
      .finally(() => {
        if (ativo) setCarregando(false);
      });
    return () => {
      ativo = false;
    };
  }, []);

  // Valores calculados a partir do estado (não precisam de useState próprio)
  const total = alunos.length;
  const ativos = alunos.filter((aluno) => aluno.ativo).length;
  const inativos = total - ativos;

  // Busca por nome ou email, sem diferenciar maiúsculas e minúsculas
  const termo = busca.trim().toLowerCase();
  const alunosFiltrados = termo
    ? alunos.filter(
        (aluno) => aluno.nome.toLowerCase().includes(termo) || aluno.email.toLowerCase().includes(termo)
      )
    : alunos;

  return (
    <div className="min-h-screen bg-marca-fundo text-marca-texto">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-8">
        {/* Cabeçalho */}
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-xs font-semibold tracking-[0.2em] text-marca-roxo">PAINEL · ALUNOS</p>
            <h1 className="text-3xl font-bold text-marca-azul sm:text-4xl">Cadastro de Alunos</h1>
          </div>
          <button
            type="button"
            className="min-h-12 rounded-full bg-marca-rosa px-7 text-lg font-bold text-white transition hover:brightness-110"
          >
            + Novo aluno
          </button>
        </header>

        {/* Cards de resumo */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex flex-col gap-1 rounded-2xl bg-marca-azul px-6 py-5">
            <span className="text-sm text-indigo-100">Total de alunos</span>
            <span className="text-3xl font-bold text-white">{total}</span>
          </div>
          <div className="flex flex-col gap-1 rounded-2xl bg-white px-6 py-5 shadow-sm">
            <span className="text-sm text-marca-cinza">Ativos</span>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold">{ativos}</span>
              <span className="h-2.5 w-2.5 rounded-full bg-marca-menta ring-4 ring-marca-menta/35" />
            </div>
          </div>
          <div className="flex flex-col gap-1 rounded-2xl bg-white px-6 py-5 shadow-sm">
            <span className="text-sm text-marca-cinza">Inativos</span>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold">{inativos}</span>
              <span className="h-2.5 w-2.5 rounded-full bg-marca-rosa ring-4 ring-marca-rosa/20" />
            </div>
          </div>
        </section>

        {/* Busca */}
        <div className="flex min-h-13 items-center gap-3 rounded-full border border-indigo-200 bg-white px-5 focus-within:border-marca-azul">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B5F7A" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <line x1="16.5" y1="16.5" x2="21" y2="21" />
          </svg>
          <label htmlFor="busca" className="sr-only">
            Buscar por nome ou email
          </label>
          <input
            id="busca"
            type="search"
            value={busca}
            onChange={(evento) => setBusca(evento.target.value)}
            placeholder="Buscar por nome ou email"
            className="min-h-12 flex-1 bg-transparent outline-none"
          />
          {termo && (
            <span className="shrink-0 text-sm text-marca-cinza">
              {alunosFiltrados.length} de {total}
            </span>
          )}
        </div>

        {/* Conteúdo */}
        {carregando && <p className="text-marca-cinza">Carregando...</p>}

        {erro && (
          <p className="rounded-2xl bg-red-50 px-5 py-4 font-medium text-marca-rosa-escuro">{erro}</p>
        )}

        {!carregando && !erro && (
          <ListaAlunos
            alunos={alunosFiltrados}
            mensagemVazia={termo ? `Nenhum aluno encontrado para "${busca.trim()}".` : undefined}
            onVerDetalhes={(aluno) => setAlunoDetalheId(aluno._id)}
          />
        )}
      </div>

      {/* Modal de detalhes: só existe quando há um aluno selecionado */}
      {alunoDetalheId && (
        <DetalhesAluno
          key={alunoDetalheId}
          alunoId={alunoDetalheId}
          onFechar={() => setAlunoDetalheId(null)}
        />
      )}
    </div>
  );
}

export default App;
