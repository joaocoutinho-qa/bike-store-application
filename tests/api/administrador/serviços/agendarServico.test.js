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

    describe('Agendar serviço', () => {
        it('Deve agendar um serviço com sucesso', async () => {
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
                .post('/servicos')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    Id: 1,
                    descricao: 'Revisão simples',
                    data: '2023-11-10',
                    clientId: id_retornado,
                    hora: '10:00',
                })
            expect(resposta.statusCode).to.equal(201)
        })

        it('Não deve agendar um serviço com dados inválidos', async () => {
            const resposta = await request(URL_DA_API)
                .post('/servicos')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    Id: 1,
                    descricao: '',
                    data: 'Data_invalida',
                    clientId: 9999,
                    hora: '10:00',
                })
            expect(resposta.statusCode).to.equal(401)
        })
    })