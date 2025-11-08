# Bike Store API

API REST para gestão de uma loja de bicicletas

## Funcionalidades
- Gestão de clientes
- Cadastro e gestão de produtos
- Agendamento de revisões e serviços
- Controle financeiro

## Autenticação
- Login obrigatório para acesso às funcionalidades.
- Gerente: acesso a todas as funcionalidades do sistema
- Funcionário: acesso às funcionalidades de Gestão de Clientes e
  Agendamento de revisões e serviços.
- Autenticação via JWT (Bearer Token).

## Documentação
- Documentação disponível em `/docs` (Swagger UI).
- Arquivo Swagger em `resources/swagger.json`.

## Estrutura do Projeto
- `src/routes`: Rotas da API
- `src/controllers`: Lógica dos endpoints
- `src/services`: Regras de negócio
- `src/models`: Modelos e banco em memória
- `src/middleware`: Middlewares de autenticação, autorização e erros
- `resources`: Documentação Swagger

## Como rodar
1. Instalação das dependências:
   ```bash
   npm install
   ```
2. Iniciar o servidor:
   ```bash
   npm api-server
   npm web-server
   ```
 2. Executar os testes:
   ```bash
   npm run api
   npm run performance
   ```
4. Acesse a documentação em [http://localhost:3000/docs](http://localhost:3000/docs)

## Usuários cadastrados previamente
- Gerente: `joao.coutinho` / `123456`
- Funcionário: `tiago.barbosa` / `123456`

## Observações
- Banco de dados em memória (os dados são perdidos ao reiniciar).
- Para customizar usuários, edite `src/controllers/auth.controller.js`.
