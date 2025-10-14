const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config({ path: './.env.local' });
const axios = require('axios');
const { astroHandler } = require('./dist/server/entry.mjs');

const app = express();
app.use(express.json());
app.use(cors());

const baseUrl = 'https://api.discogs.com';
const baseHeaders = {
    headers: {
        "User-Agent":
            "MyFooBarPersonalApp/0.1",
        "Authorization":
            `Discogs key=${process.env.VITE_CONSUMER_KEY}, secret=${process.env.VITE_CONSUMER_SECRET}`
    }
};

const pagination = '?page=0&per_page=9';

app.use(express.static('./dist/client/'));
app.use(astroHandler);

app.get('/', (request, response) => {
    response.status(404).end();
});

app.get('/search/:query', async (request, response) => {
    let query = request.params.query;
    let data = await axios.get(`${baseUrl}/database/search?q=${query}&type=release&${pagination}`, baseHeaders);
    response.json(data.data);
});

app.get('/cover/:id/:option', async (request, response) => {
    let id = request.params.id;
    let option = request.params.option;

    let imageRes = await axios.get(`${baseUrl}/releases/${id}`, baseHeaders);
    let imageArray = imageRes.data.images;

    let imageData = await axios.get(imageArray[0].uri, { ...baseHeaders, responseType: 'arraybuffer' });

    if (imageArray.length > 1 && option == 1)
        imageData = await axios.get(imageArray[1].uri, { ...baseHeaders, responseType: 'arraybuffer' });

    response.setHeader('Content-Type', 'image/jpeg');
    response.send(imageData.data);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
})

