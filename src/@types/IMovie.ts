import { IGenre } from './IGenre';
export interface IMovie {
    id: string
    cover: string
    title: string
    releasedAt: string
    rating: number
    description: string
    genres: IGenre[]
}

