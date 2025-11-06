require('dotenv').config()
const request  = require('supertest')
const { expect } = require('chai')
const URL_DA_API = process.env.BASE_URL_REST

    beforeEach(async () => {
        const respostaLogin = await request(URL_DA_API)
            .post('/auth/login')
            .send({
                username: 'joao.coutinho',
                password: '123456'
            })
        token = respostaLogin.body.token
    })

    describe('Cadastro de novo cliente', () => {
        it('Deve ser possível cadastrar um novo cliente com credenciais válidas', async () => {
            const resposta = await request(URL_DA_API)
                .post('/clientes')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    Id: 1,
                    nome: 'cliente 1',
                    email: 'cliente1@email.com',
                    telefone: '1234567890'
                })
            expect(resposta.statusCode).to.equal(201)
        })

        it('Um erro deve ser retornado ao tentar cadastrar um cliente com dados inválidos', async () => {
            const response = await request(URL_DA_API)
                .post('/clientes')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    Id: 2,
                    nome: '',
                    email: 'email_invalido',
                    telefone: 'telefone_invalido'
                })
            expect(response.statusCode).to.equal(401)
        })
    })