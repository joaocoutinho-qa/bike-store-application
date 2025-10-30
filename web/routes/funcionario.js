const express = require('express');
const router = express.Router();


router.get('/funcionario', (req, res) => {
  if (!req.session.user || req.session.user.role !== 'funcionario') {
    return res.redirect('/login');
  }
  res.send(`
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
      <meta charset="UTF-8">
      <title>Dashboard Funcionário</title>
      <link rel="stylesheet" href="/login.css">
    </head>
    <body>
      <section class="section">
        <div class="container">
          <h1 class="title">Bem-vindo, Funcionário!</h1>
          <div class="buttons">
            <a class="button is-link" href="/clientes">Gestão de Clientes</a>
            <a class="button is-link" href="/servicos">Agendamento de Serviços</a>
          </div>
          <a href="/logout">Sair</a>
        </div>
      </section>
    </body>
    </html>
  `);
});

module.exports = router;
