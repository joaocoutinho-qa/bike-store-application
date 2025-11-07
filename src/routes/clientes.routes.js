import express from 'express';
import {
	listarClientes,
	criarCliente,
	obterCliente,
	atualizarCliente,
	deletarCliente
} from '../controllers/clientes.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = express.Router();
router.use(authenticateToken);

router.get('/', listarClientes);
router.post('/', criarCliente);
router.get('/:id', obterCliente);
router.put('/:id', atualizarCliente);
router.delete('/:id', deletarCliente);

export default router;
