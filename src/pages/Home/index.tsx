import { ChangeEvent, useEffect, useState } from 'react'
import { IMovie } from '../../@types/IMovie'
import { MovieCard } from '../../components/MovieCard'
import { Pagitionation } from '../../components/Pagination'
import { useMoviedb } from '../../hooks/useMoviedb'
import { PaginationProvider, usePagination } from '../../hooks/usePagination'
import { getMovieList, searchMovies } from '../../services/moviedb'
import styles from './styles.module.css'

const HomePage = () => {
    let timer: any;
    const [movieList, setMovieList] = useState<IMovie[]>([] as IMovie[])
    const [searchQuery, setSearchQuery] = useState<string>('')

    const { getGenreName } = useMoviedb()
    const { currentPage, setCurrentPage, maxPage, setMaxPage } = usePagination()

    const handleInputSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            setSearchQuery(e.target.value)
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
            ))
        }))
    }


    useEffect(() => {
        updateMovieList()
    }, [])
    useEffect(() => {
        updateMovieList()
    }, [searchQuery, currentPage])

    return (
        <div className={styles.wrapper}>
            <header>
                <h1 data-testid="title">Movies</h1>
            </header>
            <main>
                <input type="text" onChange={handleInputSearchChange} data-testid="search-input" placeholder="Busque um filme por nome, ano ou gênero" />
                <div className="movies" data-testid="movie-list">
                    {movieList.map(movie => <MovieCard key={movie.id} {...movie} />)}
                </div>
                <Pagitionation maxPage={maxPage} />
            </main>
        </div>
    )
}

export { HomePage }