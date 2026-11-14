import { Schema, model, InferSchemaType } from 'mongoose';

function normalizarTelefone(valor?: string) {
  if (!valor) return valor;
  const digitos = valor.replace(/\D/g, '');
  return valor.trim().startsWith('+') ? `+${digitos}` : `+55${digitos}`;
}

function telefoneValido(valor?: string) {
  if (!valor) return true; // telefone é opcional
  if (valor.startsWith('+55')) return /^\+55[1-9]{2}9?\d{8}$/.test(valor); // Brasil: DDD + 8 ou 9 dígitos
  return /^\+[1-9]\d{7,14}$/.test(valor); // outros países: 8 a 15 dígitos (limite do E.164)
}

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
      set: normalizarTelefone,
      validate: {
        validator: telefoneValido,
        message: 'Telefone inválido. Brasil: DDD + número. Outros países: comece com + e o código do país',
      },
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
