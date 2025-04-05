import axios from 'axios'

const baseUrl = 'https://api.discogs.com'
const baseHeaders = {
    headers: {
        "User-Agent":
            "MyFooBarPersonalApp/0.1",
        "Authorization":
            `Discogs key=${import.meta.env.VITE_CONSUMER_KEY}, secret=${import.meta.env.VITE_CONSUMER_SECRET}`
    }
}

const pagination = '?page=0&per_page=10'

const querySearch = (search) => {
    let query = encodeURIComponent(search);
    return axios.get(`${baseUrl}/database/search?q=${query}&type=release&${pagination}`, baseHeaders);
}

const grabAlbum = (resourceUrl) => {
    return axios.get(`${resourceUrl}`, baseHeaders)
}

export default { querySearch, grabAlbum }