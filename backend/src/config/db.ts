import mongoose from 'mongoose';

export async function connectDB(): Promise<void> {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
        throw new Error('MONGODB_URI não definida no arquivo .env');
    }

    await mongoose.connect(uri);
    console.log('Conectado ao MongoDB');
}