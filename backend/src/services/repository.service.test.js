const repositoryService = require("./repository.service.js");
const SequelizeMock = require("sequelize-mock");
const dbMock = new SequelizeMock();

const DEFAULT_JAVASCRIPT_REPOSITORY = {
  id: 1,
  name: "freeCodeCamp",
  fullName: "freeCodeCamp/freeCodeCamp",
  url: "https://api.github.com/repos/freeCodeCamp/freeCodeCamp",
  repoId: 28457823,
  stars: 343100,
  language: "javascript",
  owner: "freeCodeCamp",
  watchers: 343100,
  cloneUrl: "https://github.com/freeCodeCamp/freeCodeCamp.git",
  description: "item.description",
  createdAt: "2022-03-29T00:38:46.000Z",
  updatedAt: "2022-03-29T00:38:46.000Z",
};

jest.mock("../models/index.js");
const db = require("../models/index.js");
const RepositoryMock = dbMock.define("Repository", {
  ...DEFAULT_JAVASCRIPT_REPOSITORY,
});

describe("Service Test", () => {
  describe("Get repository", () => {
    beforeEach(() => {
      db.getDbByName.mockReturnValue(RepositoryMock);
    });

    it("should get from Database", async () => {
      const [{ dataValues }] = await repositoryService.getFromDb("javascript");

      expect(dataValues).toEqual(DEFAULT_JAVASCRIPT_REPOSITORY);
    });
  });
});
