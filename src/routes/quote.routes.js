module.exports = (app) => {
    const quote = require('../controllers/quote.controller');

    var router = require('express').Router();

    router.get('/', quote.findAll);
    router.get('/:id', quote.findOne);
    router.post('/', quote.create);
    router.put('/:id', quote.update);
    router.delete('/:id', quote.delete);
    router.delete('/', quote.deleteAll);

    app.use('/api/quote', router);
};
