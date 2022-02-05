import { expect } from 'chai'
import app from '../app'
import request from 'supertest'

describe('Basic tests', function () {
  this.timeout(10000)
  it('should make a POST request to /repository/load and save content on Database', async () => {

    const mock_languages = ['Javascript', 'Python']

    let load = await request(app)
    .post('/repository/load')
    .send({languages: mock_languages})    

    expect(load.status).to.eq(200)

    let loaded_repos = await request(app)
    .get('/repository')

    const {repositories} = loaded_repos.body

    expect(repositories.length).to.be.gt(0)

  })

})