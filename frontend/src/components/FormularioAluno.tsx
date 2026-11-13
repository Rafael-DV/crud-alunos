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

const classeInput =
  'min-h-12 w-full rounded-xl border border-indigo-200 bg-white px-4 outline-none transition focus:border-marca-azul focus:ring-4 focus:ring-indigo-100';

export function FormularioAluno({ onFechar }: FormularioAlunoProps) {
  const [dados, setDados] = useState<DadosFormulario>({
    nome: '',
    email: '',
    telefone: '',
    curso: '',
    ativo: true,
  });

  function atualizarCampo(campo: CampoTexto, valor: string) {
    setDados((anterior) => ({ ...anterior, [campo]: valor }));
  }

   return (
    <Modal titulo="Novo aluno" onFechar={onFechar}>
      <form className="flex flex-col gap-5">
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
            className={classeInput}
          />
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
            className={classeInput}
          />
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
              className={classeInput}
            />
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
              className={classeInput}
            />
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

        <div className="flex justify-end">
          <button
            type="button"
            onClick={onFechar}
            className="min-h-12 rounded-full border border-indigo-200 px-6 font-semibold text-marca-roxo transition hover:bg-indigo-50"
          >
            Cancelar
          </button>
        </div>
      </form>
    </Modal>
  );
}