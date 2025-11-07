import db from '../models/db.js';
import { v4 as uuidv4 } from 'uuid';

export function listarLancamentos(req, res) {
  res.json(db.financeiro);
}

export function criarLancamento(req, res) {
  const lancamento = { id: uuidv4(), ...req.body };
  db.financeiro.push(lancamento);
  res.status(201).json(lancamento);
}

export function obterLancamento(req, res) {
  const lancamento = db.financeiro.find(f => f.id === req.params.id);
  if (!lancamento) return res.status(404).json({ message: 'Lançamento não encontrado' });
  res.json(lancamento);
}

export function atualizarLancamento(req, res) {
  const idx = db.financeiro.findIndex(f => f.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Lançamento não encontrado' });
  db.financeiro[idx] = { ...db.financeiro[idx], ...req.body };
  res.json(db.financeiro[idx]);
}

export function deletarLancamento(req, res) {
  const idx = db.financeiro.findIndex(f => f.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Lançamento não encontrado' });
  db.financeiro.splice(idx, 1);
  res.status(204).send();
}
