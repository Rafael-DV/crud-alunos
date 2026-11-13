import { Schema, model, InferSchemaType } from 'mongoose';

const alunoSchema = new Schema(
    {
        nome: {
            type: String,
            required: [true, 'O nome é obrigatório'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'O email é obrigatório'],
            unique: true,
            trim: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, 'Formato de email inválido'],
        },
        telefone: {
            type: String,
            trim: true,
        },
        curso: {
            type: String,
            required: [true, 'O curso é obrigatório'],
            trim: true,
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