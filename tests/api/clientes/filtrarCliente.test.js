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

    describe('Filtrar cliente especifico', () => {
        it('Deve filtrar cliente específico por ID válido', async () => {
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
                .get(`/clientes/?id=${id_retornado}`)
                .set('Authorization', `Bearer ${token}`)
            expect(resposta.statusCode).to.equal(200)
        })

        it('Não deve filtrar nenhum cliente com ID inválido', async () => {
            const response = await request(URL_DA_API)
                .get('/clientes/?id=29999')
                .set('Authorization', `Bearer ${token}`)
            expect(response.statusCode).to.equal(404)
        })
    })