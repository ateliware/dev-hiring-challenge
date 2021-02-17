import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './app.module';

describe('StudentService', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('POST /favorite - Should create a favorite bind', async () => {
    const response = await request(app.getHttpServer())
      .post('/favorite')
      .send([
        {
          repo_id: 1,
          language: 'C',
        },
      ])
      .expect(201);

    expect(response.body).toHaveLength(1);
    expect(response.body[0].repo_id).toBe(1);
    return expect(response.body[0].language).toBe('c');
  });

  it('DELETE /favorite - Should delete a bind of favorite', async () => {
    const created = await request(app.getHttpServer())
      .post('/favorite')
      .send([
        {
          repo_id: 1,
          language: 'Python',
        },
      ])
      .expect(201);

    expect(created.body).toHaveLength(1);

    request(app.getHttpServer())
      .delete('/favorite')
      .send([
        {
          id: 1,
        },
      ])
      .expect(200);
  });

  it('GET /favorite - Should get list of favorite repos', async () => {
    const created = await request(app.getHttpServer())
      .post('/favorite')
      .send([
        {
          repo_id: 1,
          language: 'Typescript',
        },
      ])
      .expect(201);

    expect(created.body).toHaveLength(1);

    const response = await request(app.getHttpServer())
      .get('/favorite')
      .expect(200);

    expect(response.body).toHaveLength(1);
    expect(response.body[0].repo_id).toBe(1);
    return expect(response.body[0].language).toBe('typescript');
  });
});
