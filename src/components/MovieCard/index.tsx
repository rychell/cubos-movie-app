import { IMovie } from '../../@types/IMovie'
import { Chip } from '../Chip'

import styles from './styles.module.css'

const MovieCard = (props: IMovie) => {
    const { cover,
        title,
        releasedAt,
        rating,
        description,
        genres } = props
    return (
        <article className={styles.wrapper}>
            <div className={styles.coverImage}>
                <img src={cover} alt="" data-testid="cover-image" />
            </div>
            <div className={styles.movieDetails}>
                <header>
                    <h2 data-testid="title">{title}</h2>
                    <span className={styles.releasedDate} data-testid="released-date">{releasedAt.toLocaleDateString()}</span>
                    <span className={styles.rating} data-testid="rating">{rating * 10}%</span>
                </header>
                <main>
                    <p data-testid="description">{description}</p>
                    <div className={styles.tags} data-testid="genres">
                        {genres.map((genre, index) => {
                            return <Chip key={index} text={genre.name} />
                        })}
                    </div>
                </main>
            </div>
        </article>
    )
}

export { MovieCard }