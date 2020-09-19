import axios from "axios";
import repositorioService from "./repositorio.service.js"

jest.mock("axios");

describe("Buscar repositórios", () => {
  test("Deveria buscar repositórios", () => {
    const retorno = {
      data: {
        items: [
          {
            nome: "Teste 01",
            proprietario: "Aron",
            descricao: "Teste 01",
            url: "https://github.com/Aron/Teste-01",
            linguagem: "Java",
            forks: 3,
            issues: 2,
            estrelas: 32,
            seguidores: 12,
            privado: false,
          },
          {
            nome: "Teste 02",
            proprietario: "ARichter",
            descricao: ":Teste 02",
            url: "https://github.com/ARichter/Teste-02",
            linguagem: "Java",
            forks: 2,
            issues: 4,
            estrelas: 12,
            seguidores: 7,
            privado: false,
          },
          {
            nome: "Teste 03",
            proprietario: "ARich",
            descricao: "Teste 03",
            url: "https://github.com/ARich/Teste-03",
            linguagem: "Java",
            forks: 5,
            issues: 8,
            estrelas: 86,
            seguidores: 8,
            privado: false,
          }
        ]
      }
    };
    
    axios.get.mockResolvedValue(retorno);

    const resultado = repositorioService.buscarRepositorios("Java")

    expect(resultado).toBeTruthy();
  })

  test("Deveria lançar exceção", async () => {
    const retorno = Promise.reject();
    axios.get.mockRejectedValueOnce(retorno);
    
    try {
      await repositorioService.buscarRepositorios("Java");
    }catch (e) {
      expect(e).toBeTruthy();
    }
  })  
})