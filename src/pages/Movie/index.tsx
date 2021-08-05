import {  useParams } from 'react-router-dom'
import { Chip } from '../../components/Chip'
import { PageGrid } from '../../components/PageGrid'
import styles from './styles.module.css'
import { useEffect } from 'react';
import { getMovieInfo } from '../../services/moviedb';
import { useState } from 'react';
import { IMovie } from '../../@types/IMovie';

interface IMovieParams {
    id: string
}
const MoviePage = () => {
    const { id } = useParams<IMovieParams>()
    const [movie, setMovie] = useState<IMovie>({} as IMovie)

    const fetchMovieData = async () => {
        const movieDataRaw = await getMovieInfo(id)
        const movieDataFormated = {
            cover: `https://image.tmdb.org/t/p/w500${movieDataRaw.poster_path}`,
            id: movieDataRaw.id,
            description: movieDataRaw.overview,
            genres: movieDataRaw.genres,
            rating: movieDataRaw.vote_average,
            releasedAt: new Date(movieDataRaw.release_date),
            title: movieDataRaw.title,
            revenue: movieDataRaw.revenue,
            budget: movieDataRaw.budget,
            runtime: movieDataRaw.runtime,
            status: movieDataRaw.status,
            spoken_languages: movieDataRaw.spoken_languages.map((language: any) => language.name)
        } as IMovie

        setMovie(movieDataFormated)
    }
    useEffect(() => {
        fetchMovieData()
    }, [])
    
    useEffect(() => {
        document.title = movie.title ? `${movie.title} - The Movie App` : 'The Movie App'
    }, [movie])
    return (
        <PageGrid title="Movies">
            {movie.id ? (
                <article className={styles.movie}>
                    <header>
                        <h1>{movie.title}</h1>
                        <span>{movie.releasedAt.toLocaleDateString()}</span>
                    </header>
                    <main>
                        <div className={styles.details}>
                            <h2>Sinopse</h2>
                            <p>{movie.description}</p>
                            <h2>Informações</h2>
                            <div className={styles.statistics}>
                                {movie.status && (
                                    <div>
                                        <h3>Situação</h3>
                                        <span>{movie.status}</span>
                                    </div>
                                )}
                                {movie.spoken_languages.length > 0 && (
                                    <div>
                                        <h3>Idioma</h3>
                                        <span>{movie.spoken_languages.join(", ")}</span>
                                    </div>
                                )}
                                {movie.runtime > 0 && (
                                    <div>
                                        <h3>Duração</h3>
                                        <span>{`${Math.trunc(movie.runtime / 60)}h ${movie.runtime % 60}min`}</span>
                                    </div>
                                )}
                                {movie.budget > 0 && (
                                    <div>
                                        <h3>Orçamento</h3>
                                        <span>{new Intl.NumberFormat('en-US', { style: 'currency', currency: "USD" }).format(movie.budget)}</span>
                                    </div>
                                )}
                                {movie.revenue > 0 && (
                                    <div>
                                        <h3>Receita</h3>
                                        <span>{new Intl.NumberFormat('en-US', { style: 'currency', currency: "USD" }).format(movie.revenue)}</span>
                                    </div>
                                )}
                                {movie.revenue > 0 && movie.budget > 0 && (
                                    <div>
                                        <h3>Lucro</h3>
                                        <span>{new Intl.NumberFormat('en-US', { style: 'currency', currency: "USD" }).format(movie.revenue - movie.budget)}</span>
                                    </div>
                                )}
                            </div>

                            {movie.genres.map(genre => (<Chip key={genre.id} text={genre.name} />))}
                            {movie.rating && (
                                <span className={styles.rating} data-testid="rating">{movie.rating * 10}%</span>
                            )}
                        </div>
                        <div className={styles.coverImage}>
                            <img src={movie.cover} alt="" />
                        </div>
                    </main>
                </article>
            ) : null}

        </PageGrid>
    )
}

export { MoviePage }