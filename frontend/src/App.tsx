import { useEffect, useState } from 'react';
import { api } from './services/api';
import type { Aluno } from './types/aluno';
import { ListaAlunos } from './components/ListaAlunos';

function App() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  async function carregarAlunos() {
    try {
      const resposta = await api.get<Aluno[]>('/alunos');
      setAlunos(resposta.data);
      setErro('');
    } catch {
      setErro('Não foi possível carregar os alunos. Verifique se a API está rodando.');
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarAlunos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Cadastro de Alunos</h1>

        {carregando && <p className="text-gray-500">Carregando...</p>}

        {erro && <p className="bg-red-100 text-red-700 px-4 py-3 rounded">{erro}</p>}

        {!carregando && !erro && <ListaAlunos alunos={alunos} />}
      </div>
    </div>
  );
}

export default App;