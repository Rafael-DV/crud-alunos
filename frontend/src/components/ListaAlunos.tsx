import type { Aluno } from '../types/aluno';

interface ListaAlunosProps {
  alunos: Aluno[];
}

function formatarData(data: string) {
  return new Date(data).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
}

export function ListaAlunos({ alunos }: ListaAlunosProps) {
  if (alunos.length === 0) {
    return <p className="text-center text-gray-500 py-8">Nenhum aluno cadastrado ainda.</p>;
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="w-full text-left">
        <thead className="bg-gray-50 text-sm text-gray-600">
          <tr>
            <th className="px-4 py-3">Nome</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Curso</th>
            <th className="px-4 py-3">Telefone</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Cadastrado em</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((aluno) => (
            <tr key={aluno._id} className="border-t border-gray-200 hover:bg-gray-50">
              <td className="px-4 py-3 font-medium text-gray-800">{aluno.nome}</td>
              <td className="px-4 py-3 text-gray-600">{aluno.email}</td>
              <td className="px-4 py-3 text-gray-600">{aluno.curso}</td>
              <td className="px-4 py-3 text-gray-600">{aluno.telefone || '—'}</td>
              <td className="px-4 py-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    aluno.ativo ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {aluno.ativo ? 'Ativo' : 'Inativo'}
                </span>
              </td>
              <td className="px-4 py-3 text-sm text-gray-500">{formatarData(aluno.criado_em)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}