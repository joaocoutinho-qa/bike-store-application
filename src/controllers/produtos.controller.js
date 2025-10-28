const db = require('../models/db');
const { v4: uuidv4 } = require('uuid');

exports.listarProdutos = (req, res) => {
  res.json(db.produtos);
};

exports.criarProduto = (req, res) => {
  const produto = { id: uuidv4(), ...req.body };
  db.produtos.push(produto);
  res.status(201).json(produto);
};

exports.obterProduto = (req, res) => {
  const produto = db.produtos.find(p => p.id === req.params.id);
  if (!produto) return res.status(404).json({ message: 'Produto não encontrado' });
  res.json(produto);
};

exports.atualizarProduto = (req, res) => {
  const idx = db.produtos.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Produto não encontrado' });
  db.produtos[idx] = { ...db.produtos[idx], ...req.body };
  res.json(db.produtos[idx]);
};

exports.deletarProduto = (req, res) => {
  const idx = db.produtos.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Produto não encontrado' });
  db.produtos.splice(idx, 1);
  res.status(204).send();
};
