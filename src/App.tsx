import { useEffect, useState } from "react";
import { useMoviedb } from "./hooks/useMoviedb";
import { getGenreList } from "./services/moviedb";
import { Routes } from './Routes';

function App() {
  const [isLoading, setIsLoading] = useState<Boolean>(true)
  const { setGenres } = useMoviedb()

  const updateGenresList = async () => {
    const genres = await getGenreList()
    setGenres(genres)
    setIsLoading(false)
  }
  useEffect(() => {
    updateGenresList()
  }, [])
  return (
    <div className="App">
      {isLoading ? '' : (<Routes />)}
    </div>
  );
}

export default App;
