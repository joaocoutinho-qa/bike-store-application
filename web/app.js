const express = require('express');
const path = require('path');
const session = require('express-session');

const app = express();
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'bike-store-secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));


const loginRouter = require('./routes/login');
const adminRouter = require('./routes/admin');
const funcionarioRouter = require('./routes/funcionario');

const clientesRouter = require('./routes/clientes');
const produtosRouter = require('./routes/produtos');
const servicosRouter = require('./routes/servicos');
const financeiroRouter = require('./routes/financeiro');
const logoutRouter = require('./routes/logout');

app.use('/', loginRouter);
app.use('/', adminRouter);
app.use('/', funcionarioRouter);
app.use('/', clientesRouter);
app.use('/', produtosRouter);
app.use('/', servicosRouter);
app.use('/', financeiroRouter);
app.use('/', logoutRouter);

app.get('/', (req, res) => {
  res.redirect('/login');
});

app.listen(PORT, () => {
  console.log(`Web app running on http://localhost:${PORT}`);
});
