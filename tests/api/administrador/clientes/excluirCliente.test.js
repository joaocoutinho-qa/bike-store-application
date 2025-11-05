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

    describe('Excluir cliente específico', () => {
        it('Deve excluir um cliente existente', async () => {
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
                .delete(`/clientes/${id_retornado}`)
                .set('Authorization', `Bearer ${token}`)
            expect(resposta.statusCode).to.equal(204)
        })

        it('Não deve excluir um cliente com ID inválido', async () => {
            const resposta = await request(URL_DA_API)
                .delete('/clientes/99999')
                .set('Authorization', `Bearer ${token}`)
            expect(resposta.statusCode).to.equal(404)
        })
    })