import http from 'k6/http'
import { check, sleep } from 'k6'
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js'

export const options = {
  vus: 50,
  iterations: 500
}

export default function () {
  const url = 'http://localhost:3000/api/clientes'
  const urlLogin = 'http://localhost:3000/api/auth/login'
  
  //Faz login e gera o token
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

  //Lista todos os clientes e analisa a performance

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  }

  const res = http.get(url,params)
  
  check(res, {
    'status é 200': (r) => r.status === 200
  })
  sleep(1)
}

export function handleSummary(data) {
  return {
    'listaDeClientes.html': htmlReport(data),
  }
}