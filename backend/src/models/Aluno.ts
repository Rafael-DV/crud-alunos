import { Schema, model, InferSchemaType } from 'mongoose';

const alunoSchema = new Schema(
  {
    nome: {
      type: String,
      required: [true, 'O nome é obrigatório'],
      trim: true,
      maxlength: [100, 'O nome deve ter no máximo 100 caracteres'],
    },
    email: {
      type: String,
      required: [true, 'O email é obrigatório'],
      unique: true,
      trim: true,
      lowercase: true,
      maxlength: [254, 'O email deve ter no máximo 254 caracteres'],
      match: [/^\S+@\S+\.\S+$/, 'Formato de email inválido'],
    },
    telefone: {
      type: String,
      trim: true,
      maxlength: [20, 'O telefone deve ter no máximo 20 caracteres'],
    },
    curso: {
      type: String,
      required: [true, 'O curso é obrigatório'],
      trim: true,
      maxlength: [100, 'O curso deve ter no máximo 100 caracteres'],
    },
    ativo: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: { createdAt: 'criado_em', updatedAt: 'atualizado_em' },
    versionKey: false,
  }
);

export type Aluno = InferSchemaType<typeof alunoSchema>;
export const AlunoModel = model('Aluno', alunoSchema);
