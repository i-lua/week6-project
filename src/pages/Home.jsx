import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SearchBar from '../components/SearchBar'

const Home = () => {
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  // const handleSearch = () => {
  //   if (searchTerm) {
  //     setLoading(true)
  //     navigate(`/Search?query=${encodeURIComponent(searchTerm)}`)
  //   }
  // }

  return (
    <><div className='header'>
      <div className="header-container">
        <i className='fa fa-video-camera'><span>Best Movies</span></i>  *// fix this quote
        <div className="header-options">
          <Link className="underline" to="/">
            Home
          </Link>
          <Link className="underline" to="/Search">
            Find Your Movie
          </Link>
          <Link to="/">
            <button className="btn">Contact</button>
          </Link>
        </div>
      </div>
    </div><div className="body">
        <div className="body-container">
          <h1>Find the Movie that speaks to you. One search away, infinite adventures. </h1>
          <h2>Search for your movie with ...</h2>
         <SearchBar 
         loading={loading} 
         setLoading={setLoading}
         searchTerm={searchTerm}
         setSearchTerm={setSearchTerm}
         />
        </div>
      </div></>
  )
}

export default Home
