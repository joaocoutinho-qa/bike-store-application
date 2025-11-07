import express from 'express';
import {
	listarProdutos,
	criarProduto,
	obterProduto,
	atualizarProduto,
	deletarProduto
} from '../controllers/produtos.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = express.Router();
router.use(authenticateToken);

router.get('/', listarProdutos);
router.post('/', criarProduto);
router.get('/:id', obterProduto);
router.put('/:id', atualizarProduto);
router.delete('/:id', deletarProduto);

export default router;
