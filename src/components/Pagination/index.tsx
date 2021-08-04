import { useHistory, useLocation } from 'react-router-dom'
import { usePagination } from '../../hooks/usePagination'
import styles from './styles.module.css'

interface IPaginationProps {
    totalPages?: number
    maxPage?: number
}

const Pagitionation = ({ totalPages = 5, maxPage = 10 }: IPaginationProps) => {
    const { currentPage, setCurrentPage } = usePagination()
    const { pathname } = useLocation()
    const history = useHistory()
    const pageGenerator = (elem: any, index: number) => {
        if (currentPage + totalPages > maxPage + 1) {
            return maxPage - (totalPages - index - 1)
        }
        else if (currentPage >= totalPages / 2) {
            return Math.floor(currentPage - totalPages / 2) + index + 1
        }
        else {
            return index + 1
        }

    }
    const handleClick = (page: number) => {
        history.push(`${pathname}?page=${page}`)
        setCurrentPage(page)
    }

    const pages = Array.from({ length: totalPages }, pageGenerator).filter(page => page>0)
    return (
        <ul className={styles.paginator}>
            {pages.map((page) => (
                <li
                    className={page === currentPage ? styles.active : ''}
                    onClick={() => { handleClick(page) }}
                >
                    {page}
                </li>)
            )}
        </ul>
    )
}

export { Pagitionation }