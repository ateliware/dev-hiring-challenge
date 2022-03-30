import { api1 } from "./routes/result-1";
import { api2 } from "./routes/result-2";
import { api3 } from "./routes/result-3";
import { api4 } from "./routes/result-4";
import { api5 } from "./routes/result-5";

test("Propriedade languages da API 1 não pode ser nula", () => {
  expect(api1.languages).not.toBeNull();
});

test("Propriedade languages da API 2 não pode ser nula", () => {
  expect(api2.languages).not.toBeNull();
});

test("Propriedade languages da API 3 não pode ser nula", () => {
  expect(api3.languages).not.toBeNull();
});

test("Propriedade languages da API 4 não pode ser nula", () => {
  expect(api4.languages).not.toBeNull();
});

test("Propriedade languages da API 5 não pode ser nula", () => {
  expect(api5.languages).not.toBeNull();
});
