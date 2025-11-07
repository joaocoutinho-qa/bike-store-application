import db from '../models/db.js';
import { v4 as uuidv4 } from 'uuid';

export function listarClientes(req, res) {
  res.json(db.clientes);
}

export function criarCliente(req, res) {
  const cliente = { id: uuidv4(), ...req.body };
  db.clientes.push(cliente);
  res.status(201).json(cliente);
}

export function obterCliente(req, res) {
  const cliente = db.clientes.find(c => c.id === req.params.id);
  if (!cliente) return res.status(404).json({ message: 'Cliente não encontrado' });
  res.json(cliente);
}

export function atualizarCliente(req, res) {
  const idx = db.clientes.findIndex(c => c.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Cliente não encontrado' });
  db.clientes[idx] = { ...db.clientes[idx], ...req.body };
  res.json(db.clientes[idx]);
}

export function deletarCliente(req, res) {
  const idx = db.clientes.findIndex(c => c.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Cliente não encontrado' });
  db.clientes.splice(idx, 1);
  res.status(204).send();
}
