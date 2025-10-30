const express = require('express');
const router = express.Router();


router.get('/admin', (req, res) => {
  if (!req.session.user || req.session.user.role !== 'admin') {
    return res.redirect('/login');
  }
  res.send(`
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
      <meta charset="UTF-8">
      <title>Dashboard Administrador</title>
      <link rel="stylesheet" href="/login.css">
      <style>
        .centered-box { max-width: 700px; margin: 60px auto; padding: 2rem; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); text-align: center; }
        .main-buttons { display: flex; flex-wrap: wrap; gap: 1.5rem; justify-content: center; margin: 2rem 0; }
        .main-buttons .button { min-width: 220px; font-size: 1.1rem; }
        .logout-link { margin-top: 2rem; display: inline-block; }
      </style>
    </head>
    <body style="background:#f8f8f8;">
      <section class="section">
        <div class="container centered-box">
          <h1 class="title">Bem-vindo, Administrador!</h1>
          <div class="main-buttons">
            <a class="button is-primary" href="/clientes">Gestão de Clientes</a>
            <a class="button is-primary" href="/produtos">Gestão de Produtos</a>
            <a class="button is-primary" href="/servicos">Agendamento de Serviços</a>
            <a class="button is-primary" href="/financeiro">Controle Financeiro</a>
          </div>
          <a class="logout-link" href="/logout">Sair</a>
        </div>
      </section>
    </body>
    </html>
  `);
});

module.exports = router;
