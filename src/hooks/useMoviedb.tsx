import { useState } from "react"
import { ReactNode, useContext } from "react"
import { createContext } from "react"
import { IGenre } from './../@types/IGenre';

interface IMoviedbProvider {
    children: ReactNode
}

interface IMoviedbContext {
    genres: IGenre[]
    setGenres: (genres: IGenre[]) => void
    getGenreName: (id: number) => string
}

const MoviedbContext = createContext<IMoviedbContext>({} as IMoviedbContext)


const MoviedbProvider = ({ children }: IMoviedbProvider) => {
    const [genres, setGenres] = useState<IGenre[]>([] as IGenre[])

    const getGenreName = (id: number) => {
        return genres.find(genre => genre.id === id)?.name || id.toString()
    }
    return (
        <MoviedbContext.Provider value={{ genres, setGenres, getGenreName }}>
            {children}
        </MoviedbContext.Provider>
    )
}

const useMoviedb = () => {
    return useContext(MoviedbContext)
}

export { MoviedbProvider, useMoviedb }