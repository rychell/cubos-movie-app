import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './styles.module.css'

interface IPageGridProps {
    title: string
    children: ReactNode
}
const PageGrid = ({ title, children }: IPageGridProps) => {
    const { pathname } = useLocation()
    return (
        <div className={styles.wrapper}>
            <header>
                {pathname === "/" ? (
                    <Link to="/">
                        <h1 data-testid="title" className={styles.title}>{title}</h1>
                    </Link>
                ) : (
                    <Link to="/">
                        <div data-testid="title" className={styles.title}>{title}</div>
                    </Link>
                )}
            </header>
            <main>
                {children}
            </main>
        </div>
    )
}

export { PageGrid }