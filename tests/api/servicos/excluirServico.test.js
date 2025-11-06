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
    describe('Excluir serviço específico', () => {
        it('Deve excluir um serviço com sucesso', async () => {
            const cadastrarCliente = await request(URL_DA_API)
                .post('/clientes')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    Id: 1,
                    nome: 'cliente 1',
                    email: 'cliente1@email.com',
                    telefone: '1234567890'
                })
            id_retornado = cadastrarCliente.body.id

            const cadastrarServico = await request(URL_DA_API)
                .post('/servicos')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    Id: 1,
                    descricao: 'Manutenção manopla',
                    data: '2025-12-10',
                    clientId: id_retornado,
                    hora: '11:00',
                })
            id_servico = cadastrarServico.body.id

            const resposta = await request(URL_DA_API)
                .delete(`/servicos/${id_servico}`)
                .set('Authorization', `Bearer ${token}`)
            expect(resposta.statusCode).to.equal(204)
        })

        it('Não deve excluir um serviço com ID inválido', async () => {
            const resposta = await request(URL_DA_API)
                .delete(`/servicos/ID_inválido`)
                .set('Authorization', `Bearer ${token}`)
            expect(resposta.statusCode).to.equal(404)
        })
    })