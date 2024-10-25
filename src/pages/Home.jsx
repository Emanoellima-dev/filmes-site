import { useState, useEffect } from 'react'
import React from 'react'
import axios from 'axios'
import MovieCard from '../components/MovieCard'
import './MoviesGrid.css'

const Authorization = import.meta.env.VITE_AUTHORIZATION;

export default function Home(){
 const [topMovies, setTopMovies] = useState([]);

 useEffect(() => {
  async function getTopRatedMovies(){
   try {
     const response = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?language=pt-BR&page=1`, {
       headers: {
         accept: 'application/json',
         Authorization: `${Authorization}`
       }
     })

      setTopMovies(response.data.results);
   } catch(error){
     console.error("erro ao buscar os filmes", error)
   }
  }

  getTopRatedMovies();
 }, [])

  return (
    <div className="container">
     <h2 className="title">Melhores filmes:</h2>
     <div className="movies-container">
      {topMovies && topMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
     </div>
    </div>
  )
}
