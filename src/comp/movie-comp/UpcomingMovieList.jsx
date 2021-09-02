import { useState, useEffect } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import MovieCard from './MovieCard';

function UpcomingMovieList() {

    const [upcomingmovies, setUpcomingMovies] = useState([])

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=9122d3e99f5cf10f65b111a1dcd51b20&language=ru-RU&page=1')
            .then(res => res.json())
            .then(data => {
                setUpcomingMovies(data.results)
            })
    }, [])

    let properties = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive:
        [
            {
                breakpoint:580,
                settings:{
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint:320,
                settings:{
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    }

    return (
        <>
            <div className="movie-title title">
                <h1>Upcoming Movies</h1>
            </div>
            <Slider className="pop-movies-list list" {...properties}>
                {
                    upcomingmovies.map(item => (
                        <MovieCard data={item} />
                    ))
                }
            </Slider>
        </>
    )
}

export default UpcomingMovieList;