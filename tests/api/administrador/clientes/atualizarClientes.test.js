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
    describe('Atualizar cliente específico', () => {
        it('Deve atualizar um cliente específico', async () => {
            const cadastrar_cliente = await request(URL_DA_API)
                .post('/clientes')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    Id: 1,
                    nome: 'cliente 1',
                    email: 'cliente1@email.com',
                    telefone: '1234567890'
                })
            id_retornado = cadastrar_cliente.body.id
            
            const resposta = await request(URL_DA_API)
                .put(`/clientes/${id_retornado}`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    nome: 'cliente 1 atualizado',
                    email: 'cliente1atualizado@email.com',
                    telefone: '0987654321'
                })
            expect(resposta.statusCode).to.equal(200)
        })

        it('Deve atualizar um cliente específico com dados inválidos', async () => {
            const cadastrar_cliente = await request(URL_DA_API)
                .post('/clientes')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    Id: 1,
                    nome: 'cliente 1',
                    email: 'cliente1@email.com',
                    telefone: '1234567890'
                })
            
            const resposta = await request(URL_DA_API)
                .put(`/clientes/ID_inválido`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    nome: 'cliente 1 atualizado',
                    email: 'cliente1atualizado@email.com',
                    telefone: '0987654321'
                })
            expect(resposta.statusCode).to.equal(404)
        })
    })