import { useState } from 'react';
import axios from 'axios';
import { api } from '../services/api';
import type { Aluno } from '../types/aluno';
import { Modal } from './Modal';

interface ConfirmarExclusaoProps {
  aluno: Aluno;
  onCancelar: () => void;
  onExcluido: (id: string) => void;
}

export function ConfirmarExclusao({ aluno, onCancelar, onExcluido }: ConfirmarExclusaoProps) {
  const [excluindo, setExcluindo] = useState(false);
  const [erro, setErro] = useState('');

  async function excluir() {
    setExcluindo(true);
    setErro('');
    try {
      await api.delete(`/alunos/${aluno._id}`);
      onExcluido(aluno._id);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        onExcluido(aluno._id);
        return;
      }
      setErro('Não foi possível excluir o aluno. Tente novamente.');
      setExcluindo(false);
    }
  }

  return (
    <Modal titulo="Excluir aluno" onFechar={onCancelar}>
      <div className="flex flex-col gap-6">
        <p className="leading-relaxed">
          Tem certeza que deseja excluir{' '}
          <strong className="[overflow-wrap:anywhere]">{aluno.nome}</strong>? Essa ação não pode ser desfeita.
        </p>

        {erro && (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-marca-rosa-escuro">{erro}</p>
        )}

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancelar}
            className="min-h-12 rounded-full border border-indigo-200 px-6 font-semibold text-marca-roxo transition hover:bg-indigo-50"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={() => void excluir()}
            disabled={excluindo}
            className="min-h-12 rounded-full bg-marca-rosa-escuro px-8 font-bold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {excluindo ? 'Excluindo...' : 'Excluir'}
          </button>
        </div>
      </div>
    </Modal>
  );
}