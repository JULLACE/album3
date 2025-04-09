import axios from 'axios'

const baseUrl = `${import.meta.env.VITE_LINK_HANDLER}`

const querySearch = (search) => {
    let query = encodeURIComponent(search);
    return axios.get(`${baseUrl}/search/${query}`)
}

const grabAlbum = (songID) => {
    return axios.get(`${baseUrl}/cover/${songID}`)
}

export default { querySearch, grabAlbum }