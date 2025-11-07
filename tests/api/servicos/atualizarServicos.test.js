import 'dotenv/config';
import request from 'supertest';
import { expect } from 'chai';
const URL_DA_API = process.env.BASE_URL_REST;

let token;
beforeEach(async () => {
    const respostaLogin = await request(URL_DA_API)
        .post('/auth/login')
        .send({
            username: 'joao.coutinho',
            password: '123456'
        });
    token = respostaLogin.body.token;
});

describe('Atualizar serviço específico', () => {
    it('Deve atualizar um serviço com sucesso', async () => {
        const cadastrar_cliente = await request(URL_DA_API)
            .post('/clientes')
            .set('Authorization', `Bearer ${token}`)
            .send({
                Id: 1,
                nome: 'cliente 1',
                email: 'cliente1@email.com',
                telefone: '1234567890'
            });
        const id_retornado = cadastrar_cliente.body.id;

        const cadastrar_servico = await request(URL_DA_API)
            .post('/servicos')
            .set('Authorization', `Bearer ${token}`)
            .send({
                Id: 1,
                descricao: 'Revisão simples',
                data: '2023-11-10',
                clientId: id_retornado,
                hora: '10:00',
            });
        const id_servico = cadastrar_servico.body.id;

        const resposta = await request(URL_DA_API)
            .put(`/servicos/${id_servico}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                descricao: 'Revisão completa',
                data: '2023-11-11',
                clientId: id_retornado,
                hora: '10:00',
            });
        expect(resposta.statusCode).to.equal(200);
    });

    it('Não deve atualizar um serviço com dados inválidos', async () => {
        const resposta = await request(URL_DA_API)
            .put(`/servicos/ID_inválido`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                descricao: 'Revisão completa',
                data: '2023-11-11',
                clientId: 9999,
                hora: '11:00',
            });
        expect(resposta.statusCode).to.equal(404);
    });
});