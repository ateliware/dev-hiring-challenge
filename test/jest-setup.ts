import { SetupServer } from '@src/server'
import supertest from 'supertest'
import { getConnection } from 'typeorm'

let server: SetupServer

beforeAll(async () => {
  server = new SetupServer()
  await server.init()
  global.testRequest = supertest(server.App)
})

afterAll(async () => {
  await server.closeDatabase()
})

afterEach(async () => {
  // Fetch all the entities
  const entities = getConnection().entityMetadatas

  for (const entity of entities) {
    const repository = getConnection().getRepository(entity.name) // Get repository
    await repository.clear() // Clear each entity table's content
  }
})
