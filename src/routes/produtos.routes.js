const express = require('express');
const router = express.Router();
const produtosController = require('../controllers/produtos.controller');
const { authenticateToken } = require('../middleware/auth.middleware');

router.use(authenticateToken);

router.get('/', produtosController.listarProdutos);
router.post('/', produtosController.criarProduto);
router.get('/:id', produtosController.obterProduto);
router.put('/:id', produtosController.atualizarProduto);
router.delete('/:id', produtosController.deletarProduto);

module.exports = router;
