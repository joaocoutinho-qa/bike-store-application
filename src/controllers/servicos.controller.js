import db from '../models/db.js';
import { v4 as uuidv4 } from 'uuid';

export function listarServicos(req, res) {
  res.json(db.servicos);
}

export function criarServico(req, res) {
  const servico = { id: uuidv4(), ...req.body };
  db.servicos.push(servico);
  res.status(201).json(servico);
}

export function obterServico(req, res) {
  const servico = db.servicos.find(s => s.id === req.params.id);
  if (!servico) return res.status(404).json({ message: 'Serviço não encontrado' });
  res.json(servico);
}

export function atualizarServico(req, res) {
  const idx = db.servicos.findIndex(s => s.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Serviço não encontrado' });
  db.servicos[idx] = { ...db.servicos[idx], ...req.body };
  res.json(db.servicos[idx]);
}

export function deletarServico(req, res) {
  const idx = db.servicos.findIndex(s => s.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Serviço não encontrado' });
  db.servicos.splice(idx, 1);
  res.status(204).send();
}
