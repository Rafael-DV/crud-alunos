import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { AlunoModel, type Aluno } from '../models/Aluno.js';

// Só esses campos podem vir do usuário (evita mexerem em _id ou criado_em)
const CAMPOS_PERMITIDOS = ['nome', 'email', 'telefone', 'curso', 'ativo'] as const;

function filtrarCampos(body: Record<string, unknown> = {}): Partial<Aluno> {
  const dados: Record<string, unknown> = {};
  for (const campo of CAMPOS_PERMITIDOS) {
    if (body[campo] !== undefined) dados[campo] = body[campo];
  }
  return dados as Partial<Aluno>;
}

// Transforma erros do Mongoose/MongoDB em respostas HTTP claras
function tratarErro(error: unknown, res: Response): void {
  if (error instanceof mongoose.Error.ValidationError) {
    // Erros por campo, ex.: { email: 'Formato de email inválido' }
    const erros: Record<string, string> = {};
    for (const [campo, detalhe] of Object.entries(error.errors)) {
      erros[campo] = detalhe.message;
    }
    res.status(400).json({ mensagem: 'Dados inválidos', erros });
    return;
  }

  if ((error as { code?: number }).code === 11000) {
    const mensagem = 'Já existe um aluno com este email';
    res.status(409).json({ mensagem, erros: { email: mensagem } });
    return;
  }
  console.error(error);
  res.status(500).json({ mensagem: 'Erro interno do servidor' });
}

function idValido(id: string, res: Response): boolean {
  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({ mensagem: 'ID inválido' });
    return false;
  }
  return true;
}

// GET /alunos
export async function listar(req: Request, res: Response): Promise<void> {
  try {
    const alunos = await AlunoModel.find().sort({ criado_em: -1 });
    res.status(200).json(alunos);
  } catch (error) {
    tratarErro(error, res);
  }
}

// GET /alunos/:id
export async function buscarPorId(req: Request<{ id: string }>, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    if (!idValido(id, res)) return;

    const aluno = await AlunoModel.findById(id);
    if (!aluno) {
      res.status(404).json({ mensagem: 'Aluno não encontrado' });
      return;
    }
    res.status(200).json(aluno);
  } catch (error) {
    tratarErro(error, res);
  }
}

// POST /alunos
export async function criar(req: Request, res: Response): Promise<void> {
  try {
    const aluno = await AlunoModel.create(filtrarCampos(req.body));
    res.status(201).json(aluno);
  } catch (error) {
    tratarErro(error, res);
  }
}

// PUT /alunos/:id  -> substitui o aluno inteiro
export async function atualizar(req: Request<{ id: string }>, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    if (!idValido(id, res)) return;

    const aluno = await AlunoModel.findById(id);
    if (!aluno) {
      res.status(404).json({ mensagem: 'Aluno não encontrado' });
      return;
    }

    const { nome, email, telefone, curso, ativo } = req.body ?? {};
    aluno.set({ nome, email, telefone, curso, ativo: ativo ?? true });
    await aluno.save();

    res.status(200).json(aluno);
  } catch (error) {
    tratarErro(error, res);
  }
}

// PATCH /alunos/:id  -> altera só os campos enviados
export async function atualizarParcial(req: Request<{ id: string }>, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    if (!idValido(id, res)) return;

    const aluno = await AlunoModel.findById(id);
    if (!aluno) {
      res.status(404).json({ mensagem: 'Aluno não encontrado' });
      return;
    }

    aluno.set(filtrarCampos(req.body));
    await aluno.save();

    res.status(200).json(aluno);
  } catch (error) {
    tratarErro(error, res);
  }
}

// DELETE /alunos/:id
export async function excluir(req: Request<{ id: string }>, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    if (!idValido(id, res)) return;

    const aluno = await AlunoModel.findByIdAndDelete(id);
    if (!aluno) {
      res.status(404).json({ mensagem: 'Aluno não encontrado' });
      return;
    }
    res.status(204).send();
  } catch (error) {
    tratarErro(error, res);
  }
}