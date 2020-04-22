const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe("Github Repository", () => {

    beforeEach(async () => {
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('Buscar e salvar repositórios do GitHub', async () => {
        const response = await request(app).post('/github-repository').send({ q: "test" });
        expect(response.status).toBe(201);
    });

    it('Erro ao não enviar item para busca dos repositórios no GitHub', async () => {
        const response = await request(app).post('/github-repository');
        expect(response.status).toBe(400);
    });

    it('Listar repositórios salvos no banco de dados', async () => {
        const response = await request(app).get('/github-repository');
        expect(response.status).toBe(200);
    });


})