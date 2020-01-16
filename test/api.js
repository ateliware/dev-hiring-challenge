var chai  = require('chai')
var server = require('../server')
var chaiHttp = require('chai-http')

chai.use(chaiHttp)

var should = chai.should()

it('post with incorrect data', done => {
    chai.request(server)
    .post('')
    .end((err, res) => {
        res.should.have.status(200)
        res.should.be.json
        res.body.should.be.a('object')
        res.body.msg.should.be.equal('Incorrect data format')
        done()
    })
})