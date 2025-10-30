const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/login', (req, res) => {
  res.sendFile(require('path').join(__dirname, '../views/login.html'));
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const response = await axios.post('http://localhost:3000/api/auth/login', { username, password });
    req.session.user = response.data.user;
    req.session.token = response.data.token;
    if (response.data.user.role === 'admin') {
      res.redirect('/admin');
    } else {
      res.redirect('/funcionario');
    }
  } catch (err) {
    let errorMsg = 'Usuário ou senha inválidos.';
    if (err.response && err.response.data && err.response.data.message) {
      errorMsg += ' - ' + err.response.data.message;
    }
    res.send(`<!DOCTYPE html><html><head><meta http-equiv='refresh' content='2;url=/login'><link rel='stylesheet' href='/login.css'></head><body><div class='login-container box'><div class='error-message'>${errorMsg}</div><a href='/login'>Voltar</a></div></body></html>`);
  }
});

module.exports = router;
