const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth.routes'));
router.use('/clientes', require('./clientes.routes'));
router.use('/servicos', require('./servicos.routes'));
router.use('/financeiro', require('./financeiro.routes'));
router.use('/produtos', require('./produtos.routes'));

module.exports = router;
