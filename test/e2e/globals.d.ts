declare namespace NodeJS {
  interface Global {
    appRequest: import('supertest').SuperTest<import('supertest').Test>
  }
}
