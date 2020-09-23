const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const { sequelize } = require('../models');

// Configure chai
chai.use(chaiHttp);
chai.should();

describe('Testing quote API', () => {
    var quotes = [];

    before((done) => {
        sequelize.sync();
        done();
    });

    describe('TESTING POST and DELETE API', () => {
        var delId;
        // Delete to reset the database
        it('Should Remove all quotes', (done) => {
            chai.request(app)
                .del('/api/quote')
                .end((err, res) => {
                    if (err) {
                        throw err;
                    }
                    res.should.have.status(200);
                    res.body.message.should.have.string('quotes were deleted successfully!');
                    done();
                });
        });

        // Test to add firt new quote
        it('Should create first new quote', (done) => {
            chai.request(app)
                .post('/api/quote')
                .send({
                    content: 'The purpose of our lives is to be happy',
                    author: 'Dalai Lama',
                })
                .end((err, res) => {
                    if (err) {
                        throw err;
                    }
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.content.should.be.string('The purpose of our lives is to be happy');
                    res.body.author.should.be.string('Dalai Lama');
                    done();
                });
        });

        // Test to add second new quote
        it('Should create second new quote', (done) => {
            chai.request(app)
                .post('/api/quote')
                .send({
                    content: 'Life is what happens when you are busy making other plans',
                    author: 'John Lennon',
                })
                .end((err, res) => {
                    if (err) {
                        throw err;
                    }
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.content.should.be.string('Life is what happens when you are busy making other plans');
                    res.body.author.should.be.string('John Lennon');
                    done();
                });
        });

        // Test to add third new quote
        it('Should create third new quote', (done) => {
            chai.request(app)
                .post('/api/quote')
                .send({
                    content: 'Get busy living or get busy dying',
                    author: 'Stephen King',
                })
                .end((err, res) => {
                    if (err) {
                        throw err;
                    }
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    delId = res.body.id;
                    res.body.content.should.be.string('Get busy living or get busy dying');
                    res.body.author.should.be.string('Stephen King');
                    done();
                });
        });

        // Test to remove third new quote
        it('Should remove the third new quote', (done) => {
            chai.request(app)
                .del(`/api/quote/${delId}`)
                .end((err, res) => {
                    if (err) {
                        throw err;
                    }
                    res.should.have.status(200);
                    res.body.message.should.have.string(`Quote ${delId} was deleted successfully`);
                    done();
                });
        });
    });

    describe('TESTING GET API', () => {
        // Test to get all quotes
        it('Should get all quotes', (done) => {
            chai.request(app)
                .get('/api/quote')
                .end((err, res) => {
                    if (err) {
                        throw err;
                    }
                    res.should.have.status(200);
                    res.body.should.be.a('array');

                    quotes = res.body;
                    quotes[0].content.should.be.string('The purpose of our lives is to be happy');
                    quotes[1].content.should.be.string('Life is what happens when you are busy making other plans');
                    done();
                });
        });

        // Test to get single quote
        it('Should get a single quote', (done) => {
            chai.request(app)
                .get(`/api/quote/${quotes[0].id}`)
                .end((err, res) => {
                    if (err) {
                        throw err;
                    }
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.content.should.be.string(`${quotes[0].content}`);
                    res.body.author.should.be.string(`${quotes[0].author}`);
                    done();
                });
        });
    });

    describe('TESTING PUT API', () => {
        // Test to update first quote
        it('Should update first quote', (done) => {
            chai.request(app)
                .put(`/api/quote/${quotes[0].id}`)
                .send({
                    content: 'You only live once, but if you do it right, once is enough',
                    author: 'Mae West',
                })
                .end((err, res) => {
                    if (err) {
                        throw err;
                    }
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.message.should.be.string(`Quote ${quotes[0].id} was updated successfully`);
                    done();
                });
        });

        // Test to check if the first quote correctly updated
        it('Should get the updated first quote', (done) => {
            chai.request(app)
                .get(`/api/quote/${quotes[0].id}`)
                .end((err, res) => {
                    if (err) {
                        throw err;
                    }
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.content.should.be.string('You only live once, but if you do it right, once is enough');
                    res.body.author.should.be.string('Mae West');
                    quotes[0] = res.body;
                    done();
                });
        });
    });
});
