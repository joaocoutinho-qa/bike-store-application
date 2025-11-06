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
    describe('Listar todos os serviços', () => {
        it('Deve listar todos os serviços com sucesso', async () => {
            const resposta = await request(URL_DA_API)
                .get('/servicos')
                .set('Authorization', `Bearer ${token}`)
            expect(resposta.statusCode).to.equal(200)
        })

        it('Deve retornar um erro ao listar serviços com token inválido', async () => {
            const resposta = await request(URL_DA_API)
                .get('/servicos')
                .set('Authorization', `Bearer token_invalido`)
            expect(resposta.statusCode).to.equal(401)
        })
    })      

    