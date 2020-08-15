const request = require('supertest')

describe('Post Endpoints', () => {
  it('should create a new post', async () => {
    const res = await request('https://api.github.com/')
      .get('search/repositories?q=language:php&sort=stars&order=desc')
    expect(res.statusCode).toEqual(200)
  })
})