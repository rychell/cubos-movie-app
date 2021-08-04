import { ChangeEvent, useEffect, useState } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { IMovie } from '../../@types/IMovie'
import { MovieCard } from '../../components/MovieCard'
import { PageGrid } from '../../components/PageGrid'
import { Pagitionation } from '../../components/Pagination'
import { useMoviedb } from '../../hooks/useMoviedb'
import { usePagination } from '../../hooks/usePagination'
import { getMovieList, searchMovies } from '../../services/moviedb'
import styles from './styles.module.css'

interface ISearchParams {
    terms: string
}

const HomePage = () => {
    let timer: any;
    const { getGenreName } = useMoviedb()
    const { currentPage, setCurrentPage, maxPage, setMaxPage } = usePagination()
    const { search } = useLocation()
    
    const queryString = new URLSearchParams(search)
    setCurrentPage(parseInt(queryString.get("page") as string) || 1)

    const [movieList, setMovieList] = useState<IMovie[]>([] as IMovie[])
    const [searchQuery, setSearchQuery] = useState<string>('')


    const handleInputSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            const query = e.target.value
            setSearchQuery(query)
            setCurrentPage(1)
        }, 350)
    }

    const updateMovieList = async () => {
        let movieListRaw: any

        if (searchQuery) {
            movieListRaw = await searchMovies(searchQuery, currentPage)
        }
        else {
            movieListRaw = await getMovieList(currentPage)
        }
        const movieListFormatted = formatMovieList(movieListRaw.results)
        const pagesAvailable = movieListRaw.total_pages || 1

        setMaxPage(pagesAvailable)
        setMovieList(movieListFormatted)
    }

    const formatMovieList = (movies: any[]) => {
        return movies.map((movie: any) => ({
            id: movie.id,
            cover: `https://image.tmdb.org/t/p/w300${movie.poster_path}`,
            title: movie.title,
            releasedAt: new Date(movie.release_date),
            rating: movie.vote_average,
            description: movie.overview,
            genres: movie.genre_ids.map((genre: number, index: number) => (
                {
                    id: genre,
                    name: getGenreName(genre)
                }
            )),
            revenue: movie.revenue,
            budget: movie.budget,
            runtime: movie.runtime,
            status: movie.status,
            spoken_languages: movie.spoken_languages && movie.spoken_languages.map((language: any) => language.name)
        }))
    }

    useEffect(() => {
        updateMovieList()
    }, [])
    useEffect(() => {
        updateMovieList()
    }, [searchQuery, currentPage])

    return (
        <PageGrid title="Movies">
            <input
                type="text"
                className={styles.searchInput}
                onChange={handleInputSearchChange}
                data-testid="search-input"
                placeholder="Busque um filme por nome, ano ou gênero"
            />
            <div className="movies" data-testid="movie-list">
                {movieList.map(movie => <MovieCard key={movie.id} {...movie} />)}
            </div>
            <Pagitionation maxPage={maxPage} />
        </PageGrid>

    )
}

export { HomePage }