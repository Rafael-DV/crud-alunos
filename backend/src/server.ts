import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import alunoRoutes from './routes/alunos.js';
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.json());
app.use('/alunos', alunoRoutes);

const PORT = Number(process.env.PORT) || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao conectar no MongoDB:', error);
    process.exit(1);
  });