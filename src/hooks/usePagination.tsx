import { useState } from "react"
import { ReactNode, useContext } from "react"
import { createContext } from "react"

interface IPaginationProvider {
    children: ReactNode
}

interface IPaginationContext {
    currentPage: number
    setCurrentPage: (page: number) => void,
    maxPage: number
    setMaxPage: (total: number) => void,
}

const PaginationContext = createContext<IPaginationContext>({} as IPaginationContext)

const PaginationProvider = ({ children }: IPaginationProvider) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [maxPage, setMaxPage] = useState(1)
    return (
        <PaginationContext.Provider value={{ currentPage, setCurrentPage, maxPage, setMaxPage }}>
            {children}
        </PaginationContext.Provider>
    )
}

const usePagination = () => {
    return useContext(PaginationContext)
}

export { PaginationProvider, usePagination }