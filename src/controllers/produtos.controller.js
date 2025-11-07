import db from '../models/db.js';
import { v4 as uuidv4 } from 'uuid';

export function listarProdutos(req, res) {
  res.json(db.produtos);
}

export function criarProduto(req, res) {
  const produto = { id: uuidv4(), ...req.body };
  db.produtos.push(produto);
  res.status(201).json(produto);
}

export function obterProduto(req, res) {
  const produto = db.produtos.find(p => p.id === req.params.id);
  if (!produto) return res.status(404).json({ message: 'Produto não encontrado' });
  res.json(produto);
}

export function atualizarProduto(req, res) {
  const idx = db.produtos.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Produto não encontrado' });
  db.produtos[idx] = { ...db.produtos[idx], ...req.body };
  res.json(db.produtos[idx]);
}

export function deletarProduto(req, res) {
  const idx = db.produtos.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Produto não encontrado' });
  db.produtos.splice(idx, 1);
  res.status(204).send();
}
