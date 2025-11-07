import 'dotenv/config';
import request from 'supertest';
import { expect } from 'chai';
const URL_DA_API = process.env.BASE_URL_REST;

describe('Autenticação de usuário do tipo funcionário', () => {
    it('O usuário do tipo funcionário deve ser autenticado com credenciais válidas', async () => {
        const response = await request(URL_DA_API)
            .post('/auth/login')
            .send({
                username: 'tiago.barbosa',
                password: '123456'
            });
        expect(response.statusCode).to.equal(200);
    });

    it('O usuário do tipo funcionário não deve ser autenticado com credenciais inválidas', async () => {
        const response = await request(URL_DA_API)
            .post('/auth/login')
            .send({
                username: 'tiago.barbosa',
                password: 'senha_invalida'
            });
        expect(response.statusCode).to.equal(401);
    });
});