/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../index');

const { GitRepos } = require('../models');
const { GitRepos: repoMock } = require('./mock/models');

chai.use(chaiHttp);

const { expect } = chai;

describe('Route /repos', () => {
  before(() => {
    sinon.stub(GitRepos, 'create')
      .callsFake(repoMock.create);
    sinon.stub(GitRepos, 'findAll')
      .callsFake(repoMock.findAll);
  });

  after(() => {
    GitRepos.create.restore();
    GitRepos.findAll.restore();
  });

  describe('Get the fake list of Repos', () => {
    let response;

    before(async () => {
      response = await chai.request(server).get('/repos');
    });

    it('This GET request should return a status code 200', () => {
      expect(response).to.have.status(200);
    });
    it('this GET request contains one repository', () => {
      expect(response.body).to.have.length(1);
    });
  });

  describe('Insert new repository', () => {
    let createRequest = {};
    let firstRepoList = [];
    let secondRepoList = [];

    const newRepo = {
      id: 2,
      name: 'Yasmin`Repo',
      language: 'Python',
      description: 'Description blabla',
      user: 'Yasmin',
      userImage: 'Random image',
      created: '06/02/2004',
      updated: '06/02/2022',
      stars: 6453,
      watchs: 1,
      size: 56,
      issues: 5555,
      url: 'Random url',
    };

    before(async () => {
      firstRepoList = await chai.request(server).get('/repos')
        .then(({ body }) => body);

      createRequest = await chai.request(server).post('/repos')
        .send(newRepo);

      secondRepoList = await chai.request(server).get('/repos').then(({ body }) => body);
    });

    it('createRequest: This POST request should return a status code 201', () => {
      expect(createRequest).to.have.status(201);
    });

    it('createRequest: This request should be return a object in response body', () => {
      expect(createRequest.body).to.be.a('object');
    });

    it('secondRepoList: The second GET request should be return 2 repositories', () => {
      expect(secondRepoList).to.have.length(2);
    });
  });
});
