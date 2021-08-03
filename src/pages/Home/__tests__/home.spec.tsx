import { render } from "@testing-library/react"
import { HomePage } from "../index"

describe("Home page", () => {
    it('Renders correctly', () => {
        const { getByTestId } = render(<HomePage />)

        const titleElement = getByTestId('title')
        const searchInputElement = getByTestId('search-input')

        expect(titleElement.textContent).toBe('Movies')
        expect(searchInputElement).toBeInTheDocument()
    })
})