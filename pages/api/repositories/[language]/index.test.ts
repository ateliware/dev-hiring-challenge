import { NextApiRequest, NextApiResponse } from "next";
import { RepositoryJsonData } from "../../../../services/github";
import { RepositorySearchDatabaseData } from "../../../../services/mysql";
import repositoriesLanguage from "./index.page";

describe("ApiRepositoriesRefresh", () => {
  it("realiza a consulta e retorna erro false", async () => {
    const req = {
      method: "GET",
      query: {
        language: "JavaScript",
        q: "ateliware",
      },
      body: {},
    } as unknown as NextApiRequest;

    let response: {
      error: boolean;
      repositories: RepositoryJsonData[];
      search: RepositorySearchDatabaseData | null;
    } = {
      error: true,
      repositories: [],
      search: null,
    };
    const json = jest.fn(
      (jsonVal: {
        error: boolean;
        repositories: RepositoryJsonData[];
        search: RepositorySearchDatabaseData;
      }) => {
        response = jsonVal;
      }
    );
    let statusCode: number = 0;
    const status = jest.fn((currentStatus: number) => {
      statusCode = currentStatus;
      return {
        json,
      };
    });
    const res = { status } as unknown as NextApiResponse<any>;
    await repositoriesLanguage(req, res);
    expect(response.repositories.length).toBeGreaterThan(0);
    expect(response.search?.id).not.toBe(null);
    expect(JSON.stringify({ error: response.error })).toBe(
      JSON.stringify({ error: false })
    );
    expect(statusCode).toBe(200);
  });
  it("realiza a consulta e retorna erro", async () => {
    const req = {
      method: "GET",
      query: {
        language: "JavaScript",
        q: "not-ateliware",
      },
      body: {},
    } as unknown as NextApiRequest;

    let response;
    const json = jest.fn((jsonVal) => {
      response = jsonVal;
    });
    let statusCode: number = 0;
    const status = jest.fn((currentStatus: number) => {
      statusCode = currentStatus;
      return {
        json,
      };
    });
    const res = { status } as unknown as NextApiResponse<{
      error: boolean;
      repositories: RepositoryJsonData[];
      search: RepositorySearchDatabaseData;
    }>;
    await repositoriesLanguage(req, res);
    expect(JSON.stringify(response)).toBe(
      JSON.stringify({ error: true, repositories: [], search: null })
    );
    expect(statusCode).toBe(500);
  });
});
