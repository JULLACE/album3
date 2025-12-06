const userRouter = require('express').Router();
const { DatabaseSync } = require('node:sqlite');
const db = new DatabaseSync('data/users.db');

const bcrypt = require('bcrypt');
const { response } = require('express');

userRouter.get('/', async (request, response) => {
    db.exec(`
    create table if not exists users (
            id INTEGER PRIMARY KEY, 
            username TEXT NOT NULL UNIQUE, 
            hash TEXT NOT NULL
    )`);

    const stmt = db.prepare(
        `INSERT INTO users (username, hash)
        VALUES (?, ?)`
    );

    // const { lastInsertRowid } = stmt.run('Jane', 'Doe');
    // console.log(`Inserted: ${lastInsertRowid}`);

    const query = db.prepare("SELECT * FROM users");

    response.json(query.all());
});

userRouter.post('/create', async (request, response) => {
    console.log(request.body);
    try {
        const { username, password } = request.body;

        const query = db.prepare(`SELECT * FROM users WHERE username='${username}'`);
        const result = query.get();
        if (result) {
            console.log('Checking: ', result);
            console.log(db.prepare('SELECT * FROM users').all());
            response.status(409).json(`User already exists.`);
            return;
        }

        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const stmt = db.prepare(
            `INSERT INTO users (username, hash)
            VALUES (?, ?)`
        );

        stmt.run(username, passwordHash);
        response.status(201).json(`Successfully created user: ${username}`);
    }
    catch (err) {
        console.error(`Error while adding user. `, err.message);
        response.sendStatus(400);
    }
});

module.exports = userRouter;