import axios from 'axios'

const baseUrl = 'http://localhost:3001'

const querySearch = (search) => {
    let query = encodeURIComponent(search);
    return axios.get(`${baseUrl}/search/${query}`)
}

const grabAlbum = (songID) => {
    return axios.get(`${baseUrl}/cover/${songID}`)
}

export default { querySearch, grabAlbum }