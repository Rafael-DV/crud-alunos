import { Router } from 'express';
import {
    listar,
    buscarPorId,
    criar,
    atualizar,
    atualizarParcial,
    excluir,
} from '../controllers/alunoController.js';

const router = Router();

router.get('/', listar);
router.get('/:id', buscarPorId);
router.post('/', criar);
router.put('/:id', atualizar);
router.patch('/:id', atualizarParcial);
router.delete('/:id', excluir);

export default router;