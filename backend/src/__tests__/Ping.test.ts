import request from 'supertest';
import { app } from '../app';

describe('Ping route', () => {
    it('should be able to ping the server', (done) => {
        request(app)
            .get('/')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect({ message: 'Pong' }, done)
    })
})