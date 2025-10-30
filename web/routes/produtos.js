const express = require('express');
const axios = require('axios');
const router = express.Router();

function checkAdmin(req, res, next) {
  if (!req.session.user || req.session.user.role !== 'admin') return res.redirect('/login');
  next();
}

router.get('/produtos', checkAdmin, async (req, res) => {
  try {
    const response = await axios.get('http://localhost:3000/api/produtos', {
      headers: { Authorization: `Bearer ${req.session.token}` }
    });
    const produtos = response.data;
    let html = `<!DOCTYPE html><html><head><meta charset='utf-8'><title>Produtos</title><link rel='stylesheet' href='/login.css'></head><body><section class='section'><div class='container'>`;
  const nomeUsuario = req.session.user?.nome || 'Usuário';
  html += `<nav class='navbar' role='navigation' aria-label='main navigation'><div class='navbar-menu'><div class='navbar-start'>`;
  html += `<a class='navbar-item' href='/clientes'>Clientes</a>`;
  html += `<a class='navbar-item is-active' href='/produtos'>Produtos</a>`;
  html += `<a class='navbar-item' href='/servicos'>Servicos</a>`;
  html += `<a class='navbar-item' href='/financeiro'>Financeiro</a>`;
  html += `</div><div class='navbar-end' style='display:flex;align-items:center;gap:0.5rem;'>`;
  html += `<span style='font-weight:600;font-size:1.1rem;margin-right:0.5rem;'>Bem-vindo, ${nomeUsuario}</span>`;
  html += `<a class='navbar-item' href='/logout' style='display:flex;align-items:center;gap:0.3rem;'><svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' fill='none' viewBox='0 0 24 24' stroke='currentColor' style='vertical-align:middle;'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1'/></svg> Sair</a></div></div></nav>`;
  html += `<h1 class='title'>Produtos</h1><a class='button is-primary' href='/produtos/novo'>Novo Produto</a><table class='table is-fullwidth'><thead><tr><th>Nome</th><th>Preço</th><th>Estoque</th><th>Ações</th></tr></thead><tbody>`;
    if (produtos.length === 0) {
      html += `<tr><td colspan='4' style='text-align:center;color:#888;'>Nenhum produto cadastrado</td></tr>`;
    } else {
      produtos.forEach(p => {
        html += `<tr><td>${p.nome}</td><td>R$ ${Number(p.preco).toLocaleString('pt-BR', {minimumFractionDigits:2, maximumFractionDigits:2})}</td><td>${p.estoque}</td><td><a class='button is-small' href='/produtos/editar/${p.id}'>Editar</a> <form method='POST' action='/produtos/deletar/${p.id}' style='display:inline'><button class='button is-danger is-small' type='submit'>Excluir</button></form></td></tr>`;
      });
    }
    html += `</tbody></table></div></section></body></html>`;
    res.send(html);
  } catch (err) {
    let msg = 'Erro ao buscar produtos';
    if (err.response && err.response.data && err.response.data.message) {
      msg += ': ' + err.response.data.message;
    }
    res.send(`<div class='error-message'>${msg}</div><a href='/admin'>Voltar</a>`);
  }
});

router.get('/produtos/novo', checkAdmin, (req, res) => {
  let html = `<!DOCTYPE html><html><head><meta charset='utf-8'><title>Novo Produto</title><link rel='stylesheet' href='/login.css'></head><body><section class='section'><div class='container'><h1 class='title'>Novo Produto</h1><form method='POST' action='/produtos/novo'><div class='field'><label class='label'>Nome</label><div class='control'><input class='input' type='text' name='nome' required></div></div><div class='field'><label class='label'>Preço (R$)</label><div class='control'><input class='input' type='number' name='preco' step='0.01' min='0' required placeholder='0,00' inputmode='decimal'></div></div><div class='field'><label class='label'>Estoque</label><div class='control'><input class='input' type='number' name='estoque' required></div></div><div class='field'><button class='button is-primary' type='submit'>Salvar</button></div></form><a href='/produtos'>Voltar</a></div></section></body></html>`;
  res.send(html);
});

router.post('/produtos/novo', checkAdmin, async (req, res) => {
  try {
    await axios.post('http://localhost:3000/api/produtos', req.body, {
      headers: { Authorization: `Bearer ${req.session.token}` }
    });
    res.redirect('/produtos');
  } catch (err) {
    let msg = 'Erro ao criar produto';
    if (err.response && err.response.data && err.response.data.message) {
      msg += ': ' + err.response.data.message;
    }
    res.send(`<div class='error-message'>${msg}</div><a href='/produtos'>Voltar</a>`);
  }
});

router.get('/produtos/editar/:id', checkAdmin, async (req, res) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/produtos/${req.params.id}`, {
      headers: { Authorization: `Bearer ${req.session.token}` }
    });
    const produto = response.data;
  let html = `<!DOCTYPE html><html><head><meta charset='utf-8'><title>Editar Produto</title><link rel='stylesheet' href='/login.css'></head><body><section class='section'><div class='container'><h1 class='title'>Editar Produto</h1><form method='POST' action='/produtos/editar/${produto.id}'><div class='field'><label class='label'>Nome</label><div class='control'><input class='input' type='text' name='nome' value='${produto.nome}' required></div></div><div class='field'><label class='label'>Preço (R$)</label><div class='control'><input class='input' type='number' name='preco' value='${produto.preco}' step='0.01' min='0' required placeholder='0,00' inputmode='decimal'></div></div><div class='field'><label class='label'>Estoque</label><div class='control'><input class='input' type='number' name='estoque' value='${produto.estoque}' required></div></div><div class='field'><button class='button is-primary' type='submit'>Salvar</button></div></form><a href='/produtos'>Voltar</a></div></section></body></html>`;
    res.send(html);
  } catch (err) {
    let msg = 'Erro ao carregar produto';
    if (err.response && err.response.data && err.response.data.message) {
      msg += ': ' + err.response.data.message;
    }
    res.send(`<div class='error-message'>${msg}</div><a href='/produtos'>Voltar</a>`);
  }
});

router.post('/produtos/editar/:id', checkAdmin, async (req, res) => {
  try {
    await axios.put(`http://localhost:3000/api/produtos/${req.params.id}`, req.body, {
      headers: { Authorization: `Bearer ${req.session.token}` }
    });
    res.redirect('/produtos');
  } catch (err) {
    let msg = 'Erro ao atualizar produto';
    if (err.response && err.response.data && err.response.data.message) {
      msg += ': ' + err.response.data.message;
    }
    res.send(`<div class='error-message'>${msg}</div><a href='/produtos'>Voltar</a>`);
  }
});

router.post('/produtos/deletar/:id', checkAdmin, async (req, res) => {
  try {
    await axios.delete(`http://localhost:3000/api/produtos/${req.params.id}`, {
      headers: { Authorization: `Bearer ${req.session.token}` }
    });
    res.redirect('/produtos');
  } catch (err) {
    let msg = 'Erro ao excluir produto';
    if (err.response && err.response.data && err.response.data.message) {
      msg += ': ' + err.response.data.message;
    }
    res.send(`<div class='error-message'>${msg}</div><a href='/produtos'>Voltar</a>`);
  }
});

module.exports = router;
