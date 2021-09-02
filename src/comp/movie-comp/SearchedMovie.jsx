
import { useState, useEffect, } from 'react'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import MovieCard from './MovieCard'
import Pagination from '../main-comp/Pagination'

function SearchedMovie() {
    const { q } = useParams()

    const [searchedmovies, setSearchedMovies] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    let [totalResults, setTotalResults] = useState(0)
    let [currentPage, setCurrentPage] = useState(1)
    let [numberPages, setTotalPages] = useState(0)
    const history = useHistory()

    let title = document.querySelector('.searched-movie-info h1')

    useEffect(() => {
        if (q) {
            fetch('https://api.themoviedb.org/3/search/movie?api_key=9122d3e99f5cf10f65b111a1dcd51b20&language=ru-RU&query=' + q + '')
                .then(res => res.json())
                .then(data => {
                    setSearchedMovies(data.results)
                    setTotalResults(totalResults = data.total_results)
                    setTotalPages(numberPages = data.total_pages)
                })
        } 
    }, [q]) 

    function handleOnSubmit() { 
        history.push('/searchmovies/' + searchTerm)
    }

    let nextPage = (pageNumber) => {
        if (q) {
            fetch('https://api.themoviedb.org/3/search/movie?api_key=9122d3e99f5cf10f65b111a1dcd51b20&language=ru-RU&query=' + q + '&page=' + pageNumber + '')
                .then(res => res.json())
                .then(data => {
                    setSearchedMovies(data.results)
                    setCurrentPage(currentPage = pageNumber)
                })
        }
    }

    return (
        <>
            <div className="search-bar">
                <form onSubmit={handleOnSubmit} className="search-bar-form" action="">
                    <input onChange={e => setSearchTerm(e.target.value)} placeholder="Search a Movie" value={searchTerm} className="search-bar-input" type="search" />
                </form>
            </div>
            <div className="searched-movie-info">
                <h1>{`Вы искали: ${q}`}</h1>
                <p>{`Найдено записей на сайте: ${totalResults}`}</p>
            </div>
            <div className="searched-movies-list">
                {
                    searchedmovies.map(item => (
                        <MovieCard data={item} />
                    ))
                }
            </div>
            {
                totalResults > 20 ? <Pagination pages={numberPages} nextPage={nextPage} currentPage={currentPage} /> : ''
            }
        </>
    )
}

export default SearchedMovie;