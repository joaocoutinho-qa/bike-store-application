import http from 'k6/http'
import { check, sleep } from 'k6'
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js'

export const options = {
  vus: 1,
  iterations: 1
}

export default function () {
  const urlLogin = 'http://localhost:3000/api/auth/login'
  
  //Faz login e valida a performance
  const payloadLogin = JSON.stringify({
    username: 'tiago.barbosa',
    password: '123456'
  }) 
  
  const paramsLogin = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  
  const res = http.post(urlLogin, payloadLogin, paramsLogin)
  
  check(res, {
    'status é 200': (r) => r.status === 200
  })
  sleep(1)
}

export function handleSummary(data) {
  return {
    'authFuncionario.html': htmlReport(data),
  }
}