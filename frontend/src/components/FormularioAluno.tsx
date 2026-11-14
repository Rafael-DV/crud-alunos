import { useState } from 'react';
import { Modal } from './Modal';

interface FormularioAlunoProps {
  onFechar: () => void;
}

interface DadosFormulario {
  nome: string;
  email: string;
  telefone: string;
  curso: string;
  ativo: boolean;
}

type CampoTexto = 'nome' | 'email' | 'telefone' | 'curso';

type ErrosFormulario = Partial<Record<CampoTexto, string>>;

const REGEX_EMAIL = /^\S+@\S+\.\S+$/;

function validar(dados: DadosFormulario): ErrosFormulario {
  const erros: ErrosFormulario = {};
  if (!dados.nome.trim()) erros.nome = 'O nome é obrigatório';
  if (!dados.email.trim()) erros.email = 'O email é obrigatório';
  else if (!REGEX_EMAIL.test(dados.email.trim())) erros.email = 'Formato de email inválido';
  if (!dados.curso.trim()) erros.curso = 'O curso é obrigatório';
  return erros;
}

function classeInput(erro?: string) {
  return `min-h-12 w-full rounded-xl border bg-white px-4 outline-none transition focus:ring-4 ${
    erro
      ? 'border-marca-rosa-escuro focus:ring-pink-100'
      : 'border-indigo-200 focus:border-marca-azul focus:ring-indigo-100'
  }`;
}

export function FormularioAluno({ onFechar }: FormularioAlunoProps) {
  const [dados, setDados] = useState<DadosFormulario>({
    nome: '',
    email: '',
    telefone: '',
    curso: '',
    ativo: true,
  });
  const [erros, setErros] = useState<ErrosFormulario>({});   // ← novo

  function atualizarCampo(campo: CampoTexto, valor: string) {
    setDados((anterior) => ({ ...anterior, [campo]: valor }));
    setErros((anteriores) => ({ ...anteriores, [campo]: undefined }));   // ← linha nova
  }

  function enviar() {                                         // ← função nova
    const errosValidacao = validar(dados);
    setErros(errosValidacao);
    if (Object.keys(errosValidacao).length > 0) return;

    console.log('Dados válidos, prontos para a API:', dados);
  }

  return (
    <Modal titulo="Novo aluno" onFechar={onFechar}>    
      <form
        noValidate
        onSubmit={(evento) => {
          evento.preventDefault();
          enviar();
        }}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-1.5">
          <label htmlFor="campo-nome" className="text-sm font-semibold">
            Nome <span className="text-marca-rosa-escuro">*</span>
          </label>
          <input
            id="campo-nome"
            type="text"
            maxLength={100}
            value={dados.nome}
            onChange={(evento) => atualizarCampo('nome', evento.target.value)}
            className={classeInput(erros.nome)}
          />
          {erros.nome && <span className="text-sm text-marca-rosa-escuro">{erros.nome}</span>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="campo-email" className="text-sm font-semibold">
            Email <span className="text-marca-rosa-escuro">*</span>
          </label>
          <input
            id="campo-email"
            type="email"
            maxLength={254}
            value={dados.email}
            onChange={(evento) => atualizarCampo('email', evento.target.value)}
            className={classeInput(erros.email)}
          />
          {erros.email && <span className="text-sm text-marca-rosa-escuro">{erros.email}</span>}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="campo-telefone" className="text-sm font-semibold">
              Telefone
            </label>
            <input
              id="campo-telefone"
              type="tel"
              maxLength={20}
              placeholder="Opcional"
              value={dados.telefone}
              onChange={(evento) => atualizarCampo('telefone', evento.target.value)}
              className={classeInput(erros.telefone)}
            />
            {erros.telefone && <span className="text-sm text-marca-rosa-escuro">{erros.telefone}</span>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="campo-curso" className="text-sm font-semibold">
              Curso <span className="text-marca-rosa-escuro">*</span>
            </label>
            <input
              id="campo-curso"
              type="text"
              maxLength={100}
              value={dados.curso}
              onChange={(evento) => atualizarCampo('curso', evento.target.value)}
              className={classeInput(erros.curso)}
            />
            {erros.curso && <span className="text-sm text-marca-rosa-escuro">{erros.curso}</span>}
          </div>
        </div>

        <label htmlFor="campo-ativo" className="flex min-h-11 cursor-pointer items-center gap-3">
          <input
            id="campo-ativo"
            type="checkbox"
            checked={dados.ativo}
            onChange={(evento) => setDados((anterior) => ({ ...anterior, ativo: evento.target.checked }))}
            className="h-5 w-5 accent-marca-azul"
          />
          <span className="font-medium">Aluno ativo</span>
        </label>
        <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onFechar}
            className="min-h-12 rounded-full border border-indigo-200 px-6 font-semibold text-marca-roxo transition hover:bg-indigo-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="min-h-12 rounded-full bg-marca-rosa px-8 font-bold text-white transition hover:brightness-110"
          >
            Cadastrar
          </button>
        </div>
      </form>
    </Modal>
  );
}