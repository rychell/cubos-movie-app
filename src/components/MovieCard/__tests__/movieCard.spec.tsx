
import { render } from '@testing-library/react';
import { MovieCard } from '..';

describe("Movie Card component", () => {
    it("Renders correctly", () => {
        const movie = {
            cover: 'fake-cover',
            title: 'fake-title',
            releasedAt: 'fake date',
            rating: 5,
            description: 'fake description',
            genres: [
                { name: "fake genre 1" },
                { name: "fake genre 2" },
                { name: "fake genre 3" }
            ]
        }

        const { getByTestId } = render(<MovieCard {...movie} />)

        const imageElement = getByTestId('cover-image')
        const titleElement = getByTestId('title')
        const releasedDateElement = getByTestId('released-date')
        const ratingElement = getByTestId('rating')
        const descriptionElement = getByTestId('description')
        const genresElement = getByTestId('genres')

        expect(imageElement.getAttribute("src")).toBe(movie.cover)
        expect(titleElement.textContent).toBe(movie.title)
        expect(descriptionElement.textContent).toBe(movie.description)
        expect(ratingElement.textContent).toBe(`${movie.rating}`)
        expect(releasedDateElement.textContent).toBe(movie.releasedAt)
        expect(genresElement.childElementCount).toBe(movie.genres.length)
    })
})