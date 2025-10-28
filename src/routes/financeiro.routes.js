const express = require('express');
const router = express.Router();
const financeiroController = require('../controllers/financeiro.controller');
const { authenticateToken, authorizeRole } = require('../middleware/auth.middleware');

router.use(authenticateToken);
router.use(authorizeRole(['gerente']));

router.get('/', financeiroController.listarLancamentos);
router.post('/', financeiroController.criarLancamento);
router.get('/:id', financeiroController.obterLancamento);
router.put('/:id', financeiroController.atualizarLancamento);
router.delete('/:id', financeiroController.deletarLancamento);

module.exports = router;
