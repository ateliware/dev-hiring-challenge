const request = require('supertest');
const app = require('../server');

describe('Post Endpoints', () => {
  it('should create a new repository', async () => {
    const res = await request(app)
      .post('/api/repository/')
      .send([{
        "author": "alyssaxuu",
        "name": "flowy",
        "avatar": "https://github.com/alyssaxuu.png",
        "url": "https://github.com/alyssaxuu/flowy",
        "description": "The minimal javascript library to create flowcharts ✨",
        "language": "JavaScript",
        "languageColor": "#f1e05a",
        "stars": 4180,
        "forks": 165,
        "currentPeriodStars": 257,
        "builtBy": [
          {
            "username": "alyssaxuu",
            "href": "https://github.com/alyssaxuu",
            "avatar": "https://avatars3.githubusercontent.com/u/7581348"
          },
          {
            "username": "artmsilva",
            "href": "https://github.com/artmsilva",
            "avatar": "https://avatars3.githubusercontent.com/u/347490"
          },
          {
            "username": "JoFont",
            "href": "https://github.com/JoFont",
            "avatar": "https://avatars3.githubusercontent.com/u/8378956"
          },
          {
            "username": "WebDevSimplified",
            "href": "https://github.com/WebDevSimplified",
            "avatar": "https://avatars0.githubusercontent.com/u/39717099"
          }
        ]
      }]);
    expect(res.statusCode).toEqual(200);
    expect({"status": "Success"});
  });

  it('should fetch a single repository', async () => {
    const repositoryId = 1;
    const res = await request(app).get(`/api/repository/${repositoryId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body);
  });

  it('should fetch all repository', async () => {
    const res = await request(app).get('/api/repository');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty([]);
    expect(res.body).toHaveLength(1);
  });

  it('should update a repository', async () => {
    const res = await request(app)
      .put('/api/repository/1')
      .send({
        "id": 1,
        "author": "ivanhoinacki",
        "name": "ivanhoinacki"
      });
    expect(res.statusCode).toEqual(404);
  });

  it('should return status code 500 if db constraint is violated', async () => {
    const res = await request(app)
      .post('/api/repository')
      .send({
        "author": "ivanhoinacki",
        "name": "ivanhoinacki"
      });
    expect(res.statusCode).toEqual(500);
    expect([]);
  });

  it('should delete a repository', async () => {
    const res = await request(app).delete('/api/repository/1');
    expect(res.statusCode).toEqual(404);
  });

  it('should respond with status code 404 if resource is not found', async () => {
    const repositoryId = 1;
    const res = await request(app).get(`/api/repository/${repositoryId}`);
    expect(res.statusCode).toEqual(404);
  });
});
