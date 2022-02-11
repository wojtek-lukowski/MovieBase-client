import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
export default function MovieCard(props) {

  const { movie, favorites } = props;
  const movieId = movie._id;
  const movieTitle = movie.Title;

  const [isInFavs, setIsInFavs] = useState(true);


  useEffect(() => {
    if (favorites.includes(movieId)) {
      setIsInFavs(true)
    } else {
      setIsInFavs(false)
    }
  }, [favorites])

  addToFavs = (movieId) => {
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .post(
        `https://moviebased.herokuapp.com/users/${username}/movies/` + movieId,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        // console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  removeFromFavs = (movieId) => {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.delete(`https://moviebased.herokuapp.com/users/${username}/movies/` + movieId, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className="card">
      <div className="card-img">
        <img src={movie.ImagePath} alt="movie poster" />
      </div>
      <div className="title">{movie.Title}
      </div>
      <div className="movie-card-button">
        <Link to={`/movies/${movie._id}`} className="button-primary">See more
        </Link>
      </div>
      <div className="card-actions">
        {isInFavs &&
          <div className="button-primary is-in-favs" onClick={() => { setIsInFavs(false); removeFromFavs(movieId) }} >Remove</div>
        }
        {!isInFavs &&
          <div className="button-primary" onClick={() => { setIsInFavs(true); addToFavs(movieId) }}>Add to favs</div>
        }
      </div>
    </div >
  );
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string,
    Description: PropTypes.string
  }).isRequired
};

