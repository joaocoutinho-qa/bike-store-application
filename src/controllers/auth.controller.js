import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import db from '../models/db.js'
import User from '../models/user.model.js'
import { v4 as uuidv4 } from 'uuid'

const JWT_SECRET = process.env.JWT_SECRET || 'segredo';

// Usuários da loja (gerente e funcionário)
if (db.users.length === 0) {
  db.users.push(new User({ id: uuidv4(), username: 'joao.coutinho', password: bcrypt.hashSync('123456', 8), role: 'admin', nome: 'Joao' }));
  db.users.push(new User({ id: uuidv4(), username: 'tiago.barbosa', password: bcrypt.hashSync('123456', 8), role: 'funcionario', nome: 'Tiago' }));
  console.log('[auth.controller] Usuários padrão criados: joao.coutinho (Joao/123456), tiago.barbosa (Tiago/123456)');
  console.log('[auth.controller] Usuários atuais:', db.users);
} else {
  console.log('[auth.controller] Usuários já existentes no banco.');
}

export const login = (req, res) => {
  const { username, password } = req.body;
  const user = db.users.find(u => u.username === username);
  if (!user) return res.status(401).json({ message: 'Usuário não encontrado' });
  const valid = bcrypt.compareSync(password, user.password);
  if (!valid) return res.status(401).json({ message: 'Senha inválida' });
  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '8h' });
  res.json({ token, user: { id: user.id, username: user.username, role: user.role, nome: user.nome } });
};
