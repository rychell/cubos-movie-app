import { useEffect, useState } from 'react'
import { IMovie } from '../../@types/IMovie'
import { MovieCard } from '../../components/MovieCard'
import { getMovieList } from '../../services/moviedb'
import styles from './styles.module.css'

const HomePage = () => {
    const [movieList, setMovieList] = useState<IMovie[]>([] as IMovie[])

    const updateMovieList = async () => {
        const movieListRaw = await getMovieList()
        const movieListFormatted = movieListRaw.map((movie: any) => ({
            id: movie.id,
            cover: `https://image.tmdb.org/t/p/w300${movie.poster_path}`,
            title: movie.title,
            releasedAt: new Date(movie.release_date),
            rating: movie.vote_average,
            description: movie.overview,
            genres: movie.genre_ids.map((genre: string, index: number) => ({ id: index, name: genre }))
        }))

        setMovieList(movieListFormatted)
    }

    useEffect(() => {
        updateMovieList()
    }, [])
    return (
        <div className={styles.wrapper}>
            <header>
                <h1 data-testid="title">Movies</h1>
            </header>
            <main>
                <input type="text" data-testid="search-input" placeholder="Busque um filme por nome, ano ou gênero" />
                <div className="movies" data-testid="movie-list">
                    {movieList.map(movie => <MovieCard key={movie.id} {...movie} />)}
                </div>
            </main>
        </div>
    )
}

export { HomePage }