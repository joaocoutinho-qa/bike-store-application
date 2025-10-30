const express = require('express');
const axios = require('axios');
const router = express.Router();

function checkAuth(req, res, next) {
  if (!req.session.user) return res.redirect('/login');
  next();
}

router.get('/servicos', checkAuth, async (req, res) => {
  try {
    const response = await axios.get('http://localhost:3000/api/servicos', {
      headers: { Authorization: `Bearer ${req.session.token}` }
    });
    const servicos = response.data;
    let html = `<!DOCTYPE html><html><head><meta charset='utf-8'><title>Serviços</title><link rel='stylesheet' href='/login.css'></head><body><section class='section'><div class='container'>`;
    html += `<nav class='navbar' role='navigation' aria-label='main navigation'><div class='navbar-menu'><div class='navbar-start'>`;
    html += `<a class='navbar-item' href='/${req.session.user.role}'>Início</a>`;
    html += `<a class='navbar-item' href='/clientes'>Clientes</a>`;
    if (req.session.user.role === 'admin') {
      html += `<a class='navbar-item' href='/produtos'>Produtos</a><a class='navbar-item' href='/financeiro'>Financeiro</a>`;
    }
    html += `<a class='navbar-item is-active' href='/servicos'>Serviços</a>`;
    html += `</div><div class='navbar-end'><a class='navbar-item' href='/logout'>Sair</a></div></div></nav>`;
    html += `<h1 class='title'>Serviços</h1><a class='button is-primary' href='/servicos/novo'>Novo Serviço</a><table class='table is-fullwidth'><thead><tr><th>Cliente</th><th>Descrição</th><th>Data</th><th>Status</th><th>Ações</th></tr></thead><tbody>`;
    if (servicos.length === 0) {
      html += `<tr><td colspan='5' style='text-align:center;color:#888;'>Nenhum serviço agendado</td></tr>`;
    } else {
      servicos.forEach(s => {
        html += `<tr><td>${s.clienteNome || ''}</td><td>${s.descricao}</td><td>${s.data}</td><td>${s.status}</td><td><a class='button is-small' href='/servicos/editar/${s.id}'>Editar</a> <form method='POST' action='/servicos/deletar/${s.id}' style='display:inline'><button class='button is-danger is-small' type='submit'>Excluir</button></form></td></tr>`;
      });
    }
    html += `</tbody></table></div></section></body></html>`;
    res.send(html);
  } catch (err) {
    let msg = 'Erro ao buscar serviços';
    if (err.response && err.response.data && err.response.data.message) {
      msg += ': ' + err.response.data.message;
    }
    res.send(`<div class='error-message'>${msg}</div><a href='/${req.session.user.role}'>Voltar</a>`);
  }
});

router.get('/servicos/novo', checkAuth, (req, res) => {
  let html = `<!DOCTYPE html><html><head><meta charset='utf-8'><title>Novo Serviço</title><link rel='stylesheet' href='/login.css'></head><body><section class='section'><div class='container'><h1 class='title'>Novo Serviço</h1><form method='POST' action='/servicos/novo'><div class='field'><label class='label'>Cliente</label><div class='control'><input class='input' type='text' name='clienteNome' required></div></div><div class='field'><label class='label'>Descrição</label><div class='control'><input class='input' type='text' name='descricao' required></div></div><div class='field'><label class='label'>Data</label><div class='control'><input class='input' type='date' name='data' required></div></div><div class='field'><label class='label'>Status</label><div class='control'><input class='input' type='text' name='status' required></div></div><div class='field'><button class='button is-primary' type='submit'>Salvar</button></div></form><a href='/servicos'>Voltar</a></div></section></body></html>`;
  res.send(html);
});

router.post('/servicos/novo', checkAuth, async (req, res) => {
  try {
    await axios.post('http://localhost:3000/api/servicos', req.body, {
      headers: { Authorization: `Bearer ${req.session.token}` }
    });
    res.redirect('/servicos');
  } catch (err) {
    let msg = 'Erro ao criar serviço';
    if (err.response && err.response.data && err.response.data.message) {
      msg += ': ' + err.response.data.message;
    }
    res.send(`<div class='error-message'>${msg}</div><a href='/servicos'>Voltar</a>`);
  }
});

router.get('/servicos/editar/:id', checkAuth, async (req, res) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/servicos/${req.params.id}`, {
      headers: { Authorization: `Bearer ${req.session.token}` }
    });
    const servico = response.data;
    let html = `<!DOCTYPE html><html><head><meta charset='utf-8'><title>Editar Serviço</title><link rel='stylesheet' href='/login.css'></head><body><section class='section'><div class='container'><h1 class='title'>Editar Serviço</h1><form method='POST' action='/servicos/editar/${servico.id}'><div class='field'><label class='label'>Cliente</label><div class='control'><input class='input' type='text' name='clienteNome' value='${servico.clienteNome || ''}' required></div></div><div class='field'><label class='label'>Descrição</label><div class='control'><input class='input' type='text' name='descricao' value='${servico.descricao}' required></div></div><div class='field'><label class='label'>Data</label><div class='control'><input class='input' type='date' name='data' value='${servico.data}' required></div></div><div class='field'><label class='label'>Status</label><div class='control'><input class='input' type='text' name='status' value='${servico.status}' required></div></div><div class='field'><button class='button is-primary' type='submit'>Salvar</button></div></form><a href='/servicos'>Voltar</a></div></section></body></html>`;
    res.send(html);
  } catch (err) {
    let msg = 'Erro ao carregar serviço';
    if (err.response && err.response.data && err.response.data.message) {
      msg += ': ' + err.response.data.message;
    }
    res.send(`<div class='error-message'>${msg}</div><a href='/servicos'>Voltar</a>`);
  }
});

router.post('/servicos/editar/:id', checkAuth, async (req, res) => {
  try {
    await axios.put(`http://localhost:3000/api/servicos/${req.params.id}`, req.body, {
      headers: { Authorization: `Bearer ${req.session.token}` }
    });
    res.redirect('/servicos');
  } catch (err) {
    let msg = 'Erro ao atualizar serviço';
    if (err.response && err.response.data && err.response.data.message) {
      msg += ': ' + err.response.data.message;
    }
    res.send(`<div class='error-message'>${msg}</div><a href='/servicos'>Voltar</a>`);
  }
});

router.post('/servicos/deletar/:id', checkAuth, async (req, res) => {
  try {
    await axios.delete(`http://localhost:3000/api/servicos/${req.params.id}`, {
      headers: { Authorization: `Bearer ${req.session.token}` }
    });
    res.redirect('/servicos');
  } catch (err) {
    let msg = 'Erro ao excluir serviço';
    if (err.response && err.response.data && err.response.data.message) {
      msg += ': ' + err.response.data.message;
    }
    res.send(`<div class='error-message'>${msg}</div><a href='/servicos'>Voltar</a>`);
  }
});

module.exports = router;
