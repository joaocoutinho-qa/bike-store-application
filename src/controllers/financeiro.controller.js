const db = require('../models/db');
const { v4: uuidv4 } = require('uuid');

exports.listarLancamentos = (req, res) => {
  res.json(db.financeiro);
};

exports.criarLancamento = (req, res) => {
  const lancamento = { id: uuidv4(), ...req.body };
  db.financeiro.push(lancamento);
  res.status(201).json(lancamento);
};

exports.obterLancamento = (req, res) => {
  const lancamento = db.financeiro.find(f => f.id === req.params.id);
  if (!lancamento) return res.status(404).json({ message: 'Lançamento não encontrado' });
  res.json(lancamento);
};

exports.atualizarLancamento = (req, res) => {
  const idx = db.financeiro.findIndex(f => f.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Lançamento não encontrado' });
  db.financeiro[idx] = { ...db.financeiro[idx], ...req.body };
  res.json(db.financeiro[idx]);
};

exports.deletarLancamento = (req, res) => {
  const idx = db.financeiro.findIndex(f => f.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Lançamento não encontrado' });
  db.financeiro.splice(idx, 1);
  res.status(204).send();
};
