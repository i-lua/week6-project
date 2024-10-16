import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Movie = () => {
  const {imdbID} = useParams()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const apiKey = "5efc08a5"
  const navigate = useNavigate()
  
  const goBack = () => {
    navigate('/search')
  }

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`)
        if (response.data.Response === 'True') {
          setMovie(response.data)
      } else {
        setMovie(null)
      }
    } catch (error) {
      console.error('Error fetching movie details:', error)
      setMovie(null)
      }
      setLoading(false)
    }
    if(imdbID) {
      fetchMovieDetails()
    }
  }, [imdbID])

  if(loading) {
    return <div>Loading movie details...</div>
  }

  if (!movie) {
    return <div>Movie not found</div>
  }


  return (
    <div className="movie-details">
      <button className='back-arrow' onClick={goBack}><i className='fa fa-arrow-circle-left'></i></button>
      <img className='movie-poster' src={movie.Poster} alt={movie.Title} />
      <div className="movie-details--info">
      <h1>{movie.Title}</h1>
      <p className='movie-info'><strong>Plot: </strong>{movie.Plot || 'Plot information not available'}</p>
      <p className='movie-info'><strong>Year: </strong>{movie.Year || 'Year information is not available'}</p>
      <p className='movie-info'><strong>Genre: </strong>{movie.Genre || 'Genre information is not available'}</p>
      <p className='movie-info'><strong>Director: </strong>{movie.Director || 'Director information is not available'}</p>
      <p className='movie-info'><strong>Cast: </strong>{movie.Actors || 'Cast information is not available'}</p>
      </div>
    </div>
  )
}

export default Movie
