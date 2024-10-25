import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import MovieCard from '../components/MovieCard'
import axios from 'axios'

import './MoviesGrid.css'

const Authorization = import.meta.env.VITE_AUTHORIZATION;

export default function Search(){
 const [movies, setMovies] = useState([]);
 const [searchParams] = useSearchParams();
 const query = searchParams.get("q");


 useEffect(() => {
 async function searchMovie(){
  try {
   const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=pt-BR&page=1`, {
     headers: {
      accept: 'application/json',
      Authorization: `${Authorization}`
     }
   })

    setMovies(response.data.results)
  } catch(error){
console.erro("erro ao pesquisar o filme", error)
  }
 }

  searchMovie();
 }, [query]) 

  return (
   <div className="container">
    <h2 className="title">Resultados Para: <span className="query-text">{query}</span></h2>
     <div className="movies-container">
    {movies.length === 0 && <p>Carregando...</p>}

{movies.length > 0 && movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
     </div>
    </div>
  )
}
