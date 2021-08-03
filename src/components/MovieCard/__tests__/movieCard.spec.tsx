
import { render } from '@testing-library/react';
import { MovieCard } from '..';

describe("Movie Card component", () => {
    it("Renders correctly", () => {
        const { getByTestId } = render(<MovieCard />)

        const imageElement = getByTestId('cover-image')
        const titleElement = getByTestId('title')
        const descriptionElement = getByTestId('description')
        const ratingElement = getByTestId('rating')
        const releasedDateElement = getByTestId('release-date')
        const genresElement = getByTestId('genres')

        expect(imageElement).toBeInTheDocument()
        expect(titleElement).toBeInTheDocument()
        expect(descriptionElement).toBeInTheDocument()
        expect(ratingElement).toBeInTheDocument()
        expect(releasedDateElement).toBeInTheDocument()
        expect(genresElement).toBeInTheDocument()
    })
})