import { useEffect, useState } from "react";
import { useMoviedb } from "./hooks/useMoviedb";
import { HomePage } from "./pages/Home";
import { getGenreList } from "./services/moviedb";

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
      {isLoading ? '' : (<HomePage />)}
    </div>
  );
}

export default App;
