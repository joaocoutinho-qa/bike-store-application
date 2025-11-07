import 'dotenv/config';
import request from 'supertest';
import { expect } from 'chai';
const URL_DA_API = process.env.BASE_URL_REST;

let token;
describe('Excluir cliente específico', () => {
    beforeEach(async () => {
        const respostaLogin = await request(URL_DA_API)
            .post('/auth/login')
            .send({
                username: 'joao.coutinho',
                password: '123456'
            });
        token = respostaLogin.body.token;
    });

    it('Deve excluir um cliente existente', async () => {
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

        const resposta = await request(URL_DA_API)
            .delete(`/clientes/${id_retornado}`)
            .set('Authorization', `Bearer ${token}`);
        expect(resposta.statusCode).to.equal(204);
    });

    it('Não deve excluir um cliente com ID inválido', async () => {
        const resposta = await request(URL_DA_API)
            .delete('/clientes/99999')
            .set('Authorization', `Bearer ${token}`);
        expect(resposta.statusCode).to.equal(404);
    });
});