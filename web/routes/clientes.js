const express = require('express');
const axios = require('axios');
const router = express.Router();

// Middleware para checar autenticação e permissão
function checkAuth(req, res, next) {
  if (!req.session.user) return res.redirect('/login');
  next();
}

router.get('/clientes', checkAuth, async (req, res) => {
  try {
    const response = await axios.get('http://localhost:3000/api/clientes', {
      headers: { Authorization: `Bearer ${req.session.token}` }
    });
    const clientes = response.data;
    let html = `<!DOCTYPE html><html><head><meta charset='utf-8'><title>Clientes</title><link rel='stylesheet' href='/login.css'></head><body><section class='section'><div class='container'>`;
    const nomeUsuario = req.session.user?.nome || 'Usuário';
    html += `<nav class='navbar' role='navigation' aria-label='main navigation'><div class='navbar-menu'><div class='navbar-start'>`;
    html += `<a class='navbar-item is-active' href='/clientes'>Clientes</a>`;
    if (req.session.user.role === 'admin') {
      html += `<a class='navbar-item' href='/produtos'>Produtos</a><a class='navbar-item' href='/financeiro'>Financeiro</a>`;
    }
    html += `<a class='navbar-item' href='/servicos'>Serviços</a>`;
  html += `</div><div class='navbar-end' style='display:flex;align-items:center;gap:0.5rem;'>`;
  html += `<span style='font-weight:600;font-size:1.1rem;margin-right:0.5rem;'>Bem-vindo, ${nomeUsuario}</span>`;
  html += `<a class='navbar-item' href='/logout' style='display:flex;align-items:center;gap:0.3rem;'><svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' fill='none' viewBox='0 0 24 24' stroke='currentColor' style='vertical-align:middle;'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1'/></svg> Sair</a></div></div></nav>`;
    html += `<h1 class='title'>Clientes</h1><a class='button is-primary' href='/clientes/novo'>Novo Cliente</a><table class='table is-fullwidth'><thead><tr><th>Nome</th><th>Email</th><th>Ações</th></tr></thead><tbody>`;
    if (clientes.length === 0) {
      html += `<tr><td colspan='3' style='text-align:center;color:#888;'>Nenhum cliente cadastrado</td></tr>`;
    } else {
      clientes.forEach(c => {
        html += `<tr><td>${c.nome}</td><td>${c.email}</td><td><a class='button is-small' href='/clientes/editar/${c.id}'>Editar</a> <form method='POST' action='/clientes/deletar/${c.id}' style='display:inline'><button class='button is-danger is-small' type='submit'>Excluir</button></form></td></tr>`;
      });
    }
    html += `</tbody></table></div></section></body></html>`;
    res.send(html);
  } catch (err) {
    let msg = 'Erro ao buscar clientes';
    if (err.response && err.response.data && err.response.data.message) {
      msg += ': ' + err.response.data.message;
    }
    res.send(`<div class='error-message'>${msg}</div><a href='/${req.session.user.role}'>Voltar</a>`);
  }
});

// Formulário de novo cliente
router.get('/clientes/novo', checkAuth, (req, res) => {
  let html = `<!DOCTYPE html><html><head><meta charset='utf-8'><title>Novo Cliente</title><link rel='stylesheet' href='/login.css'></head><body><section class='section'><div class='container'><h1 class='title'>Novo Cliente</h1><form method='POST' action='/clientes/novo'><div class='field'><label class='label'>Nome</label><div class='control'><input class='input' type='text' name='nome' required></div></div><div class='field'><label class='label'>Email</label><div class='control'><input class='input' type='email' name='email' required></div></div><div class='field'><button class='button is-primary' type='submit'>Salvar</button></div></form><a href='/clientes'>Voltar</a></div></section></body></html>`;
  res.send(html);
});

// Criação de novo cliente
router.post('/clientes/novo', checkAuth, async (req, res) => {
  try {
    await axios.post('http://localhost:3000/api/clientes', req.body, {
      headers: { Authorization: `Bearer ${req.session.token}` }
    });
    res.redirect('/clientes');
  } catch (err) {
    let msg = 'Erro ao criar cliente';
    if (err.response && err.response.data && err.response.data.message) {
      msg += ': ' + err.response.data.message;
    }
    res.send(`<div class='error-message'>${msg}</div><a href='/clientes'>Voltar</a>`);
  }
});

// Formulário de edição
router.get('/clientes/editar/:id', checkAuth, async (req, res) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/clientes/${req.params.id}`, {
      headers: { Authorization: `Bearer ${req.session.token}` }
    });
    const cliente = response.data;
    let html = `<!DOCTYPE html><html><head><meta charset='utf-8'><title>Editar Cliente</title><link rel='stylesheet' href='/login.css'></head><body><section class='section'><div class='container'><h1 class='title'>Editar Cliente</h1><form method='POST' action='/clientes/editar/${cliente.id}'><div class='field'><label class='label'>Nome</label><div class='control'><input class='input' type='text' name='nome' value='${cliente.nome}' required></div></div><div class='field'><label class='label'>Email</label><div class='control'><input class='input' type='email' name='email' value='${cliente.email}' required></div></div><div class='field'><button class='button is-primary' type='submit'>Salvar</button></div></form><a href='/clientes'>Voltar</a></div></section></body></html>`;
    res.send(html);
  } catch (err) {
    let msg = 'Erro ao carregar cliente';
    if (err.response && err.response.data && err.response.data.message) {
      msg += ': ' + err.response.data.message;
    }
    res.send(`<div class='error-message'>${msg}</div><a href='/clientes'>Voltar</a>`);
  }
});

// Atualização de cliente
router.post('/clientes/editar/:id', checkAuth, async (req, res) => {
  try {
    await axios.put(`http://localhost:3000/api/clientes/${req.params.id}`, req.body, {
      headers: { Authorization: `Bearer ${req.session.token}` }
    });
    res.redirect('/clientes');
  } catch (err) {
    let msg = 'Erro ao atualizar cliente';
    if (err.response && err.response.data && err.response.data.message) {
      msg += ': ' + err.response.data.message;
    }
    res.send(`<div class='error-message'>${msg}</div><a href='/clientes'>Voltar</a>`);
  }
});

// Exclusão de cliente
router.post('/clientes/deletar/:id', checkAuth, async (req, res) => {
  try {
    await axios.delete(`http://localhost:3000/api/clientes/${req.params.id}`, {
      headers: { Authorization: `Bearer ${req.session.token}` }
    });
    res.redirect('/clientes');
  } catch (err) {
    let msg = 'Erro ao excluir cliente';
    if (err.response && err.response.data && err.response.data.message) {
      msg += ': ' + err.response.data.message;
    }
    res.send(`<div class='error-message'>${msg}</div><a href='/clientes'>Voltar</a>`);
  }
});

module.exports = router;
