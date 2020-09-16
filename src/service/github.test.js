import githubService from "./github.service.js";
import axios from 'axios';

jest.mock('axios');

describe("Monta url para gitbub", () => {
  test("Deveria montar URL corretamente", () => {
    const url = githubService.montarUrl("teste");

    expect(url).toEqual("https://api.github.com/search/repositories?sort=stars&page=0&per_page=5&q=language:teste");
  });

  test("Deveria lançar exceção", () => {
    expect(() => {
      githubService.montarUrl()
    }).toThrow("Campo de pesquisa não pode estar nulo")
  })
})

describe("Buscar repositorios no github", () => {
  test("Deveria buscar os repositorios no github", () => {
    const response = {status: 200}
    axios.get.mockResolvedValue(response);

    githubService.buscarRepositorios("teste")
      .then(response => expect(response).toEqual({status: 200}));
  })
})