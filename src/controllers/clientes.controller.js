const db = require('../models/db');
const { v4: uuidv4 } = require('uuid');

exports.listarClientes = (req, res) => {
  res.json(db.clientes);
};

exports.criarCliente = (req, res) => {
  const cliente = { id: uuidv4(), ...req.body };
  db.clientes.push(cliente);
  res.status(201).json(cliente);
};

exports.obterCliente = (req, res) => {
  const cliente = db.clientes.find(c => c.id === req.params.id);
  if (!cliente) return res.status(404).json({ message: 'Cliente não encontrado' });
  res.json(cliente);
};

exports.atualizarCliente = (req, res) => {
  const idx = db.clientes.findIndex(c => c.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Cliente não encontrado' });
  db.clientes[idx] = { ...db.clientes[idx], ...req.body };
  res.json(db.clientes[idx]);
};

exports.deletarCliente = (req, res) => {
  const idx = db.clientes.findIndex(c => c.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Cliente não encontrado' });
  db.clientes.splice(idx, 1);
  res.status(204).send();
};
