import { act, render } from "@testing-library/react"
import { HomePage } from "../index"


const movieListResponseMock = [
    {
        "adult": false,
        "backdrop_path": "/gGTCDNEvwG848u34Op1nZNALLUr.jpg",
        "genre_ids": [
            28,
            80,
            53
        ],
        "id": 385128,
        "original_language": "en",
        "original_title": "F9",
        "overview": "Dominic Toretto e sua família precisam enfrentar o seu irmão mais novo Jakob, um assassino mortal que está trabalhando com uma antiga inimiga, a cyber-terrorista Cipher.",
        "popularity": 5544.972,
        "poster_path": "/8L4Mep3KDUK4ztUgf2HlPvUVzZy.jpg",
        "release_date": "2021-05-19",
        "title": "Velozes & Furiosos 9",
        "video": false,
        "vote_average": 7.8,
        "vote_count": 1936
    },
    {
        "adult": false,
        "backdrop_path": "/dq18nCTTLpy9PmtzZI6Y2yAgdw5.jpg",
        "genre_ids": [
            28,
            12,
            53,
            878
        ],
        "id": 497698,
        "original_language": "en",
        "original_title": "Black Widow",
        "overview": "Natasha Romanoff \"Viúva Negra\" precisa confrontar partes de sua história quando surge uma conspiração perigosa ligada ao seu passado. Perseguida por uma força que não irá parar até derrotá-la, Natasha terá que lidar com sua antiga vida de espiã, e também reencontrar membros de sua família que deixou para trás antes de se tornar parte dos Vingadores.",
        "popularity": 4851.884,
        "poster_path": "/rKq1Vlw0Bqe2EEvdmIkkkgPQAGf.jpg",
        "release_date": "2021-07-07",
        "title": "Viúva Negra",
        "video": false,
        "vote_average": 7.9,
        "vote_count": 3738
    },
    {
        "adult": false,
        "backdrop_path": "/8s4h9friP6Ci3adRGahHARVd76E.jpg",
        "genre_ids": [
            16,
            35,
            10751,
            878
        ],
        "id": 379686,
        "original_language": "en",
        "original_title": "Space Jam: A New Legacy",
        "overview": "O superastro do basquete LeBron James se junta à gangue Looney Tunes para derrotar o Goon Squad e salvar seu filho.",
        "popularity": 3549.11,
        "poster_path": "/kU0NbsUVoUMcYxoISmBCxFmgWYC.jpg",
        "release_date": "2021-07-08",
        "title": "Space Jam: Um Novo Legado",
        "video": false,
        "vote_average": 7.7,
        "vote_count": 1483
    },
    {
        "adult": false,
        "backdrop_path": "/tehpKMsls621GT9WUQie2Ft6LmP.jpg",
        "genre_ids": [
            12,
            53,
            28,
            27,
            37
        ],
        "id": 602223,
        "original_language": "en",
        "original_title": "The Forever Purge",
        "overview": "A trama se passará após os eventos de ‘O Ano da Eleição’ e será focada em Adela (Ana de la Reguera) e Juan (Tenoch Huerta), que encontram abrigo em um rancho no Texas, após fugirem de um cartel no México. As coisas dão errado quando um grupo de forasteiros decide continuar purgando além do tempo concedido, quando as pessoas podem violar todas e quaisquer leis.",
        "popularity": 2617.048,
        "poster_path": "/9VGVwYDGpqW67EuSLlK6UxxNeNE.jpg",
        "release_date": "2021-06-30",
        "title": "Uma Noite de Crime 5:  A Fronteira",
        "video": false,
        "vote_average": 7.7,
        "vote_count": 768
    }
]

jest.mock('../../../services/moviedb', () => {
    return {
        async getMovieList() {
            return movieListResponseMock
        }
    }
})

describe("Home page", () => {

    it('Renders correctly', () => {
        const { getByTestId } = render(<HomePage />)

        const titleElement = getByTestId('title')
        const searchInputElement = getByTestId('search-input')

        expect(titleElement.textContent).toBe('Movies')
        expect(searchInputElement).toBeInTheDocument()
    })
    it('Renders movies from external service', async () => {
        const { findByTestId } = render(<HomePage />)
        const movieListElement = await findByTestId('movie-list')

        expect(movieListElement.childElementCount).toBe(movieListResponseMock.length)
    })
})