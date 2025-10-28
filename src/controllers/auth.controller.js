const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../models/db');
const User = require('../models/user.model');
const { v4: uuidv4 } = require('uuid');

const JWT_SECRET = process.env.JWT_SECRET || 'segredo';

// Usuários iniciais (apenas para exemplo)
if (db.users.length === 0) {
  db.users.push(new User({ id: uuidv4(), username: 'gerente', password: bcrypt.hashSync('123456', 8), role: 'gerente' }));
  db.users.push(new User({ id: uuidv4(), username: 'funcionario', password: bcrypt.hashSync('123456', 8), role: 'funcionario' }));
}

exports.login = (req, res) => {
  const { username, password } = req.body;
  const user = db.users.find(u => u.username === username);
  if (!user) return res.status(401).json({ message: 'Usuário não encontrado' });
  const valid = bcrypt.compareSync(password, user.password);
  if (!valid) return res.status(401).json({ message: 'Senha inválida' });
  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '8h' });
  res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
};
