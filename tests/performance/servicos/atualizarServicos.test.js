import http from 'k6/http'
import { check, sleep } from 'k6'
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js'

export const options = {
  vus: 1,
  iterations: 1
}

export default function () {
  const url = 'http://localhost:3000/api/servicos'
  const urlClientes = 'http://localhost:3000/api/clientes'
  const urlLogin = 'http://localhost:3000/api/auth/login'

  // Faz login e gera o token
  const payloadLogin = JSON.stringify({
    username: 'joao.coutinho',
    password: '123456'
  })

  const paramsLogin = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const respostaLogin = http.post(urlLogin, payloadLogin, paramsLogin)
  const token = respostaLogin.json().token

  // Parâmetros para cadastro e filtro
  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  }

  // Cadastra um novo cliente 
  const payloadNovoCliente = JSON.stringify({
    nome: 'Cliente para Serviço',
    email: 'cliente@servico.com',
    telefone: '987654321'
  })
  const resCadastroCliente = http.post(urlClientes, payloadNovoCliente, params)
  const clienteId = resCadastroCliente.json().id

  // Cadastra um novo serviço
  const payloadNovoServico = JSON.stringify({
    descricao: 'Revisão simples',
    data: '2023-11-10',
    clientId: clienteId,
    hora: '10:20',
  });

  const resCadastro = http.post(url,payloadNovoServico,params)
  const servicoId = resCadastro .json().id

  // Atualiza um serviço e analisa a performance
  const payloadAtualizacao = JSON.stringify({
    Id: 1,
    descricao: 'Calibrar pneus',
    data: '2025-12-19',
    clientId: clienteId,
    hora: '10:20',
})
  const res = http.put(`http://localhost:3000/api/servicos/${servicoId}`, payloadAtualizacao, params)

  check(res, {
    'status é 200': (r) => r.status === 200
  })
  sleep(1)
}

export function handleSummary(data) {
  return {
    'atualizarServico.html': htmlReport(data),
  }
}