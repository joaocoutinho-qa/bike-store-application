const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientes.controller');
const { authenticateToken } = require('../middleware/auth.middleware');

router.use(authenticateToken);

router.get('/', clientesController.listarClientes);
router.post('/', clientesController.criarCliente);
router.get('/:id', clientesController.obterCliente);
router.put('/:id', clientesController.atualizarCliente);
router.delete('/:id', clientesController.deletarCliente);

module.exports = router;
