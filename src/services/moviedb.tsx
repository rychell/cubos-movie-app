import axios from "axios";

const getMovieList = async () => {
    const response = await axios.get("https://api.themoviedb.org/3/discover/movie?api_key=5fd66233028ef25d9eef12acca027cd1&language=pt-BR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate")
    return response.data.results
}

const getGenreList = async () => {
    const response = await axios.get("https://api.themoviedb.org/3/genre/movie/list?api_key=5fd66233028ef25d9eef12acca027cd1&language=pt-BR")
    return response.data.genres
}

const getMovieInfo = async (id: string) => {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=5fd66233028ef25d9eef12acca027cd1&language=pt-BR`)
    return response.data
}
const searchMovies = async (query: string) =>{
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=5fd66233028ef25d9eef12acca027cd1&language=pt-BR&query=${query}&page=1&include_adult=false`)
    return response.data.results
}
export {getMovieList, getGenreList, getMovieInfo, searchMovies}