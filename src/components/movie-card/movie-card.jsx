import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';

export default function MovieCard(props) {

  const { movie, favorites } = props;
  const movieId = movie._id;

  const [isInFavs, setIsInFavs] = useState(false);

  useEffect(() => {
    console.log(`>>>---CARD ${movie._id}---<<<`)
    console.log('useEffect favorites', favorites);
    console.log('movie:', movie.Title);
    if (favorites.includes(movieId)) {
      console.log('in favs');
      setIsInFavs(true)
    } else {
      console.log('not in favs');
      setIsInFavs(false)
    }
  }, [favorites])

  toggleButton = (movieId) => {
    if (isInFavs) {
      setIsInFavs(false);
      removeFromFavs(movieId);
      console.log(movie.Title, movie._id, ' has been removed');
    } else {
      setIsInFavs(true);
      addToFavs(movieId);
      console.log(movie.Title, movie._id, ' has been added');
    }
  }

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
        // console.log(response);
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
      <div className="card-actions">
        <div className="movie-card-button">
          <Link to={`/movies/${movie._id}`} className="button-primary">See more
          </Link>
        </div>
        {isInFavs &&
          <div className="button-primary is-in-favs" onClick={() => toggleButton(movie._id)}>Remove</div>
        }
        {!isInFavs &&
          <div className="button-primary" onClick={() => toggleButton(movie._id)}>Add to favs</div>
        }
      </div>
    </div>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string,
    Description: PropTypes.string
  }).isRequired
};
