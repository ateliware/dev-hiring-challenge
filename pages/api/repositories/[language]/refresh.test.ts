import { NextApiRequest, NextApiResponse } from "next";
import repositoriesLanguageRefresh from "./refresh.page";

describe("ApiRepositoriesRefresh", () => {
  it("realiza a consulta e retorna erro false", async () => {
    const req = {
      method: "POST",
      query: {
        language: "JavaScript",
        q: "ateliware",
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
    const res = { status } as unknown as NextApiResponse<any>;
    await repositoriesLanguageRefresh(req, res);
    expect(JSON.stringify(response)).toBe(JSON.stringify({ error: false }));
    expect(statusCode).toBe(200);
  });
  it("realiza a consulta e retorna erro", async () => {
    const req = {
      method: "POST",
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
    const res = { status } as unknown as NextApiResponse<any>;
    await repositoriesLanguageRefresh(req, res);
    expect(JSON.stringify(response)).toBe(JSON.stringify({ error: true }));
    expect(statusCode).toBe(500);
  });
});
