import { IMovie } from '../../@types/IMovie'

import styles from './styles.module.css'

const MovieCard = (props: IMovie) => {
    const { cover,
            title,
            releasedAt,
            rating,
            description,
            genres } = props
    return (
        <article>
            <div className="cover-image">
                <img src={cover} alt="" data-testid="cover-image" />
            </div>
            <div className="movie-details">
                <header>
                    <h2 data-testid="title">{title}</h2>
                    <span data-testid="released-date">{releasedAt}</span>
                    <span data-testid="rating">{rating}</span>
                </header>
                <main>
                    <p data-testid="description">{description}</p>
                    <ul data-testid="genres">
                        {genres.map((genre, index) => {
                            return <li key={index}>{genre.name}</li>
                        })}
                    </ul>
                </main>
            </div>
        </article>
    )
}

export { MovieCard }