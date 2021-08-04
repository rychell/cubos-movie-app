import { IGenre } from './IGenre';
export interface IMovie {
    id: string
    cover: string
    title: string
    releasedAt: Date
    rating: number
    description: string
    genres: IGenre[]
}

