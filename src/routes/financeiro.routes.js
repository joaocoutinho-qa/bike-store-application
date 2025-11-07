import express from 'express';
import {
	listarLancamentos,
	criarLancamento,
	obterLancamento,
	atualizarLancamento,
	deletarLancamento
} from '../controllers/financeiro.controller.js';
import { authenticateToken, authorizeRole } from '../middleware/auth.middleware.js';

const router = express.Router();
router.use(authenticateToken);
router.use(authorizeRole(['admin']));

router.get('/', listarLancamentos);
router.post('/', criarLancamento);
router.get('/:id', obterLancamento);
router.put('/:id', atualizarLancamento);
router.delete('/:id', deletarLancamento);

export default router;
