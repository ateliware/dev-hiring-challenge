const { Php, Ruby, Swift, Javascript, Python }= require('../../src/app/models');
const truncate = require('../utils/truncate');

describe("Database", () => {

    beforeEach(async () => {
        await truncate();
    })

    it ("should insert into php's table", async () => {
        const phpInsert =  await Php.create({ url: 'url_teste', stars: 10, owner: 'testador', repo: 'a-ser-testado'})
    
        expect(phpInsert.url).toBe('url_teste')
    });

    it ("should insert into javascript's table", async () => {
        const jsInsert =  await Javascript.create({ url: 'url_teste', stars: 10, owner: 'testador', repo: 'a-ser-testado'})
  
        expect(jsInsert.url).toBe('url_teste')
    });

    it ("should insert into ruby's table", async () => {
        const rubyInsert =  await Ruby.create({ url: 'url_teste', stars: 10, owner: 'testador', repo: 'a-ser-testado'})
    
        expect(rubyInsert.url).toBe('url_teste')
    });

    it ("should insert into python's table", async () => {
        const pyInsert =  await Python.create({ url: 'url_teste', stars: 10, owner: 'testador', repo: 'a-ser-testado'})
    
        expect(pyInsert.url).toBe('url_teste')
    });

    it ("should insert into swift's table", async () => {
        const swInsert =  await Swift.create({ url: 'url_teste', stars: 10, owner: 'testador', repo: 'a-ser-testado'})
    
        expect(swInsert.url).toBe('url_teste')
    });
});