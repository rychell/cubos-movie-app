import { useEffect } from 'react'
import { Switch, Route, BrowserRouter, useLocation } from 'react-router-dom'
import { PaginationProvider } from './hooks/usePagination'
import { HomePage } from './pages/Home'
import { MoviePage } from './pages/Movie'

export function Routes() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Switch>
                <Route path="/" exact>
                    <PaginationProvider>
                       <HomePage />
                    </PaginationProvider>
                </Route>
                <Route path="/movie/:id" exact>
                    <MoviePage />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}


function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);

  return null;
}