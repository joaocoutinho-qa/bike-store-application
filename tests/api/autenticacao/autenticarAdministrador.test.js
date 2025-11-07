import 'dotenv/config';
import request from 'supertest';
import { expect } from 'chai';
const URL_DA_API = process.env.BASE_URL_REST;

describe('Autenticação de usuário administrador', () => {
    it('O usuário administrador deve ser autenticado com credenciais válidas', async () => {
        const response = await request(URL_DA_API)
            .post('/auth/login')
            .send({
                username: 'joao.coutinho',
                password: '123456'
            });
        expect(response.statusCode).to.equal(200);
    });

    it('O usuário administrador não deve ser autenticado com credenciais inválidas', async () => {
        const response = await request(URL_DA_API)
            .post('/auth/login')
            .send({
                username: 'joao.coutinho',
                password: 'senha_invalida'
            });
        expect(response.statusCode).to.equal(401);
    });
});