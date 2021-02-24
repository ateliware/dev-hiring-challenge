const request = require('supertest');
const app = require('../../src/app');
const crypto = require('crypto');
const userController = require('../../src/controllers/userController');
const connection = require('../../src/database/connection');

describe('User', () => {
  const idForTest = crypto.randomBytes(8).toString('HEX');
  
  beforeEach(async () => {
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to create a user model and save in database', async () => {
    const user = userController.createUser({
      id: idForTest,
      login: 'lucasgehlen',
      avatar_url: 'old_URL',
      html_url: 'https://github.com/lucasgehlen'
    })
    const response = await userController.saveUser(user);
    expect(response).toHaveProperty('affectedRows')
    expect(response.affectedRows).toBeGreaterThanOrEqual(1);
  });

  it('should be able to find the created user in database', async () => {
    const response = await request(app)
      .get('/user/' + idForTest);

      expect(response.body).toHaveProperty('user');
      expect(response.body.user).toHaveProperty('id');
      expect(response.body.user).toHaveProperty('login');
      expect(response.body.user).toHaveProperty('avatar_url');
      expect(response.body.user).toHaveProperty('url');
      expect(response.body.user.id).toBe(idForTest);
      expect(response.body.user.login).toBe('lucasgehlen');
      expect(response.body.user.avatar_url).toBe('old_URL');
      expect(response.body.user.url).toBe('https://github.com/lucasgehlen');
  });

  it('should be able to create a user model and update in database', async () => {
    const user = userController.createUser({
      id: idForTest,
      login: 'lucasgehlen',
      avatar_url: 'new_URL',
      html_url: 'https://github.com/lucasgehlen'
    })
    const response = await userController.saveUser(user);
    expect(response).toHaveProperty('affectedRows')
    expect(response.affectedRows).toBeGreaterThanOrEqual(1);
  });

  it('should be able to find the updated user in database', async () => {
    const response = await request(app)
    .get('/user/' + idForTest);

    expect(response.body).toHaveProperty('user');
    expect(response.body.user).toHaveProperty('id');
    expect(response.body.user).toHaveProperty('login');
    expect(response.body.user).toHaveProperty('avatar_url');
    expect(response.body.user).toHaveProperty('url');
    expect(response.body.user.id).toBe(idForTest);
    expect(response.body.user.login).toBe('lucasgehlen');
    expect(response.body.user.avatar_url).toBe('new_URL');
    expect(response.body.user.url).toBe('https://github.com/lucasgehlen');
  });
});