const lbRouter = require('express').Router();
// const { DatabaseSync } = require('node:sqlite');
// const db = new DatabaseSync('data/lb.db');

lbRouter.get('/', async (request, response) => {
    response.send('uh oh');
});

module.exports = lbRouter;