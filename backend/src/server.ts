import express, { Request, Response} from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/alunos', (req: Request, res: Response) => {
    res.status(200).json([]);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});