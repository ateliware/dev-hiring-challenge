const request = require('supertest');
const app = require('../../src/app');
const crypto = require('crypto');
const userController = require('../../src/controllers/userController');
const repositoryController = require('../../src/controllers/repositoryController');
const connection = require('../../src/database/connection');

describe('Repository', () => {
  const idForUserTest = crypto.randomBytes(8).toString('HEX');
  const idForRepositoryTest = crypto.randomBytes(8).toString('HEX');
  
  beforeAll(async () => {
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to create a user model and save in database for reference', async () => {
    const user = userController.createUser({
      id: idForUserTest,
      login: 'lucasgehlen',
      avatar_url: 'URL',
      html_url: 'https://github.com/lucasgehlen'
    })
    const response = await userController.saveUser(user);
    expect(response).toHaveProperty('affectedRows')
    expect(response.affectedRows).toBeGreaterThanOrEqual(1);
  });

  it('should be able to create a repository model and save in database', async () => {
    const repository = repositoryController.createRepository({
      id: idForRepositoryTest,
      name: 'dev-hiring-challenge',
      full_name: 'lucasgehlen/dev-hiring-challenge',
      html_url: 'https://github.com/lucasgehlen/dev-hiring-challenge',
      stargazers_count: '0',
      description: 'dev-hiring-challenge',
      language: 'Javascript',
      owner: {
        id: idForUserTest
      }
    })
    const response = await repositoryController.saveRepository(repository);
    expect(response).toHaveProperty('affectedRows')
    expect(response.affectedRows).toBeGreaterThanOrEqual(1);
  });

  it('should be able to find the created repository in database', async () => {
    const response = await request(app)
      .get('/repository/' + idForRepositoryTest);

      expect(response.body).toHaveProperty('repository');
      expect(response.body.repository).toHaveProperty('id');
      expect(response.body.repository).toHaveProperty('name');
      expect(response.body.repository).toHaveProperty('full_name');
      expect(response.body.repository).toHaveProperty('stars');
      expect(response.body.repository).toHaveProperty('url');
      expect(response.body.repository).toHaveProperty('description');
      expect(response.body.repository).toHaveProperty('language');
      expect(response.body.repository.id).toBe(idForRepositoryTest);
      expect(response.body.repository.name).toBe('dev-hiring-challenge');
      expect(response.body.repository.full_name).toBe('lucasgehlen/dev-hiring-challenge');
      expect(response.body.repository.url).toBe('https://github.com/lucasgehlen/dev-hiring-challenge');
      expect(response.body.repository.stars).toBe(0);
      expect(response.body.repository.description).toBe('dev-hiring-challenge');
      expect(response.body.repository.language).toBe('Javascript');

  });

  it('should be able to create a repository model and update in database', async () => {
    const repository = repositoryController.createRepository({
      id: idForRepositoryTest,
      name: 'dev-hiring-challenge',
      full_name: 'lucasgehlen/dev-hiring-challenge',
      html_url: 'https://github.com/lucasgehlen/dev-hiring-challenge',
      stargazers_count: '100',
      description: 'dev-hiring-challenge',
      language: 'Javascript',
      owner: {
        id: idForUserTest
      }
    })
    const response = await repositoryController.saveRepository(repository);
    expect(response).toHaveProperty('affectedRows')
    expect(response.affectedRows).toBeGreaterThanOrEqual(1);
  });

  it('should be able to find the updated repository in database', async () => {
    const response = await request(app)
    .get('/repository/' + idForRepositoryTest);

    expect(response.body).toHaveProperty('repository');
    expect(response.body.repository).toHaveProperty('id');
    expect(response.body.repository).toHaveProperty('name');
    expect(response.body.repository).toHaveProperty('full_name');
    expect(response.body.repository).toHaveProperty('stars');
    expect(response.body.repository).toHaveProperty('url');
    expect(response.body.repository).toHaveProperty('description');
    expect(response.body.repository).toHaveProperty('language');
    expect(response.body.repository.id).toBe(idForRepositoryTest);
    expect(response.body.repository.name).toBe('dev-hiring-challenge');
    expect(response.body.repository.full_name).toBe('lucasgehlen/dev-hiring-challenge');
    expect(response.body.repository.url).toBe('https://github.com/lucasgehlen/dev-hiring-challenge');
    expect(response.body.repository.stars).toBe(100);
    expect(response.body.repository.description).toBe('dev-hiring-challenge');
    expect(response.body.repository.language).toBe('Javascript');

  });
});