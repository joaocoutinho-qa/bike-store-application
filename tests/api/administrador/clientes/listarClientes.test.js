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

    describe('Listar todos os clientes', () => {
        it('Deve retornar todos os clientes cadastrados', async () => {
             const resposta = await request(URL_DA_API)
                .post('/clientes')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    Id: 1,
                    nome: 'cliente 1',
                    email: 'cliente1@email.com',
                    telefone: '1234567890'
                })
            expect(resposta.statusCode).to.equal(200)
        })

        it('Não deve retornar nenhum cliente caso o Token seja inválido', async () => {
            const resposta = await request(URL_DA_API)
                .get('/clientes')
                .set('Authorization', `Bearer ${'token_invalido'}`)
            expect(resposta.statusCode).to.equal(404)
        })
    })