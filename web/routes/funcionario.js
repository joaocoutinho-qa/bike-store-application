const express = require('express');
const router = express.Router();



router.get('/funcionario', (req, res) => {
  if (!req.session.user || req.session.user.role !== 'funcionario') {
    return res.redirect('/login');
  }
  res.redirect('/clientes');
});

module.exports = router;
