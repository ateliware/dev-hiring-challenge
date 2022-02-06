import { expect } from 'chai'
import app from '../app'
import request from 'supertest'
import { getConnection } from 'typeorm'

describe('Basic tests with GitHub API as a dependency', function () {

  this.afterEach(async () => {

    const db_connection = getConnection()

    if (process.env.NODE_ENV !== 'test') {
      console.log('Cant reset schema out of test mode. Aborting.')
    } else {
      await db_connection.dropDatabase()
      await db_connection.synchronize()
    }
  })

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

  it('should load repositories twice and only keep results from second (last) load', async () => {

    const first_mock_languages = ['Javascript', 'Ruby']

    const first_load = await request(app)
    .post('/repository/load')
    .send({languages: first_mock_languages})    

    expect(first_load.status).to.eq(200)

    const first_loaded_repos = await request(app)
    .get('/repository')

    const second_mock_languages = ['Ruby']

    const second_load = await request(app)
    .post('/repository/load')
    .send({languages: second_mock_languages})    

    expect(second_load.status).to.eq(200)    

    const second_loaded_repos = await request(app)
    .get('/repository')

    const first_loaded_repositories = first_loaded_repos.body.repositories
    const second_loaded_repositories = second_loaded_repos.body.repositories

    expect(first_loaded_repositories.length).to.be.gt(second_loaded_repositories.length)

  })


})