import { ChangeEvent, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { IMovie } from '../../@types/IMovie'
import { MovieCard } from '../../components/MovieCard'
import { PageGrid } from '../../components/PageGrid'
import { Pagitionation } from '../../components/Pagination'
import { useMoviedb } from '../../hooks/useMoviedb'
import { usePagination } from '../../hooks/usePagination'
import { getMovieList, searchMovies } from '../../services/moviedb'
import styles from './styles.module.css'

const PAGE_SIZE = 5
const PAGE_SIZE_API = 20

const HomePage = () => {
    let timer: any;
    const { getGenreName } = useMoviedb()
    const { currentPage, setCurrentPage, maxPage, setMaxPage } = usePagination()
    const { search } = useLocation()
    const history = useHistory()

    const [movieList, setMovieList] = useState<IMovie[]>([] as IMovie[])
    const [searchQuery, setSearchQuery] = useState<string>('')

    const queryString = new URLSearchParams(search)
    

    const handleInputSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            const query = e.target.value
            setSearchQuery(query)
            setCurrentPage(1)
            history.push(`/`)
        }, 500)
    }

    const updateMovieList = async () => {
        let movieListRaw: any

        const pageNumberCatalog = Math.trunc(currentPage / PAGE_SIZE + 1)

        if (searchQuery) {
            movieListRaw = await searchMovies(searchQuery, pageNumberCatalog)
        }
        else {
            movieListRaw = await getMovieList(pageNumberCatalog)
        }

        const sliceIndexBegin = ((currentPage - 1) % (PAGE_SIZE_API / PAGE_SIZE)) * PAGE_SIZE
        const sliceIndexEnd = sliceIndexBegin + PAGE_SIZE

        movieListRaw.results = movieListRaw.results.slice(sliceIndexBegin, sliceIndexEnd)

        const movieListFormatted = formatMovieList(movieListRaw.results)
        const pagesAvailable = Math.ceil(movieListRaw.total_results / PAGE_SIZE) || 1

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
        setCurrentPage(parseInt(queryString.get("page") as string) || 1)
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