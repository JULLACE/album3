const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()
const axios = require('axios')

const app = express()
app.use(express.json())
app.use(cors())

const baseUrl = 'https://api.discogs.com'
const baseHeaders = {
    headers: {
        "User-Agent":
            "MyFooBarPersonalApp/0.1",
        "Authorization":
            `Discogs key=${process.env.VITE_CONSUMER_KEY}, secret=${process.env.VITE_CONSUMER_SECRET}`
    }
}

app.get('/', (request, response) => {
    response.send('<h1> im breathing...</h1>')
})

app.get('/what', (request, response) => {
    axios.get(`${baseUrl}/database/search?q=${'hikaru utada'}&type=release&`, baseHeaders)
    .then(data => response.json(data.data))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`)
})

