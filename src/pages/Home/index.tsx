import styles from './styles.module.css'

const HomePage = () => {
    return (
        <>
            <header>
                <h1 data-testid="title">Movies</h1>
            </header>
            <main>
                <input type="text" data-testid="search-input" placeholder="Busque um filme por nome, ano ou gênero"/>
            </main>
        </>
    )
}

export { HomePage }