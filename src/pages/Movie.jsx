import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  BsGraphUp,
  BsWallet2,
  BsHourglassSplit,
  BsFillFileEarmarkTextFill
} from 'react-icons/bs'

import MovieCard from '../components/MovieCard';

import "./Movie.css"

const Authorization = import.meta.env.VITE_AUTHORIZATION;

export default function Movie(){
 const [movies, setMovie] = useState([]);
 const {id} = useParams();

  const formatCurrency = (number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

 useEffect(() => {
   async function buscarFilme() {
      try {
       const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?language=pt-BR`, {
       headers: {
         accept: 'application/json',
         Authorization: `${Authorization}`
       }
      })
      
      setMovie(response.data)
     } catch(error){
       alert("erro ao buscar filme", error)
       return
     }
   }

   buscarFilme();
  }, [id])
 

  return (
    <div className="movie-page">
       {movies && (
        <>
	  <MovieCard movie={movies} showLink={false}/>
	  <p className="tagline">{movies.tagline}</p>
	  <div className="info">
	    <h3 className="subTitle">
              <BsWallet2/> Orçamento:
	    </h3>
	      <p>{movies.budget ? movies.budget.toLocaleString('en-US',{ style: 'currency', currency: 'USD' }) : 'Budget not available'}</p>
	  </div>
	
	  <div className="info">
            <h3 className="subTitle">
              <BsGraphUp/> Receita:
            </h3>
              <p>{movies.revenue ? movies.revenue.toLocaleString('en-US',{ style: 'currency', currency: 'USD' }) : 'Budget not available'}</p>
          </div>

	  <div className="info">
	    <h3 className="subTitle">
              <BsHourglassSplit/> Duração:
	    </h3>
              <p>{movies.runtime} minutos</p>
	  </div>

	  <div className="info-description">
	    <h3>
              <BsFillFileEarmarkTextFill/> Descrição:
            </h3>
	    <p>{movies.overview}</p>
          </div>
	</>
       )}
    </div>
  )
}
