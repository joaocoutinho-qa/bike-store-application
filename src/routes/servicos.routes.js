import express from 'express';
import {
	listarServicos,
	criarServico,
	obterServico,
	atualizarServico,
	deletarServico
} from '../controllers/servicos.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = express.Router();
router.use(authenticateToken);

router.get('/', listarServicos);
router.post('/', criarServico);
router.get('/:id', obterServico);
router.put('/:id', atualizarServico);
router.delete('/:id', deletarServico);

export default router;
