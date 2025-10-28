const express = require('express');
const router = express.Router();
const servicosController = require('../controllers/servicos.controller');
const { authenticateToken } = require('../middleware/auth.middleware');

router.use(authenticateToken);

router.get('/', servicosController.listarServicos);
router.post('/', servicosController.criarServico);
router.get('/:id', servicosController.obterServico);
router.put('/:id', servicosController.atualizarServico);
router.delete('/:id', servicosController.deletarServico);

module.exports = router;
