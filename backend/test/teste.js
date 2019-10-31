process.env.NODE_ENV = 'test'
var chai = require('chai')
var server = require('../index')
var chaiHttp = require('chai-http')
var should = chai.should()

chai.use(chaiHttp)

describe('Repositorio', function() {
    var id
    it('Home - Javascript', function(done) {
        chai.request(server)
            .get('/repos/javascript')
            .end(function(err, res) {
                res.should.have.status(200)
                res.should.be.json
                res.body.should.be.a('array')
                res.body[0].should.have.property('id')
                res.body[0].should.have.property('name')
                res.body[0].should.have.property('owner')
                res.body[0].owner.should.have.property('avatar_url')
                id = res.body[0].id

                done()
            })
    })

    it('Detalhes', function(done) {
        chai.request(server)
            .get('/repos/details/' + id)
            .end(function(err, res) {
                res.should.have.status(200)
                res.should.be.json
                res.body.should.be.a('object')
                res.body.should.have.property('id')
                res.body.should.have.property('name')
                res.body.should.have.property('owner')
                res.body.owner.should.have.property('avatar_url')
                done()
            })
    })

    it('Salvar Repos', function(done) {
        chai.request(server)
            .post('/repos')
            .send({ id_github: id, name: 'test', image: 'image_test' })
            .end(function(err, res) {
                res.should.have.status(200)
                done()
            })
    })

    it('Repos já Salvo', function(done) {
        chai.request(server)
            .post('/repos')
            .send({ id_github: id, name: 'test', image: 'image_test' })
            .end(function(err, res) {
                res.should.have.status(409)
                done()
            })
    })

    it('Repos de teste removido', function(done) {
        chai.request(server)
            .del('/repos/remove')
            .send({ id_github: id })
            .end(function(err, res) {
                res.should.have.status(200)
                done()
            })
    })
})
