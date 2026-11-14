import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import { AlunoModel } from './models/Aluno.js';

// Alunos fictícios para demonstração
const alunosDeExemplo = [
  { nome: 'Ana Beatriz Souza', email: 'ana.souza@exemplo.com', telefone: '(11) 98765-4321', curso: 'Ciência da Computação', ativo: true },
  { nome: 'Bruno Henrique Lima', email: 'bruno.lima@exemplo.com', telefone: '(11) 97654-3210', curso: 'Análise e Desenvolvimento de Sistemas', ativo: true },
  { nome: 'Carla Mendes', email: 'carla.mendes@exemplo.com', curso: 'Engenharia de Software', ativo: true },
  { nome: 'Diego Rocha', email: 'diego.rocha@exemplo.com', telefone: '(11) 96543-2109', curso: 'Sistemas de Informação', ativo: false },
  { nome: 'Eduarda Ferreira', email: 'eduarda.ferreira@exemplo.com', curso: 'Ciência da Computação', ativo: true },
  { nome: 'Felipe Araújo', email: 'felipe.araujo@exemplo.com', telefone: '(11) 95432-1098', curso: 'Análise e Desenvolvimento de Sistemas', ativo: true },
  { nome: 'Gabriela Nunes', email: 'gabriela.nunes@exemplo.com', curso: 'Design Digital', ativo: false },
  { nome: 'Henrique Castro', email: 'henrique.castro@exemplo.com', telefone: '(11) 94321-0987', curso: 'Engenharia de Software', ativo: true },
];

async function executarSeed() {
  await connectDB();

  await AlunoModel.deleteMany({}); // apaga todos os alunos
  await AlunoModel.insertMany(alunosDeExemplo); // insere os de exemplo

  console.log(`${alunosDeExemplo.length} alunos de exemplo cadastrados.`);
  await mongoose.disconnect(); // fecha a conexão para o script terminar
}

executarSeed().catch((error) => {
  console.error('Erro ao rodar o seed:', error);
  process.exit(1);
});