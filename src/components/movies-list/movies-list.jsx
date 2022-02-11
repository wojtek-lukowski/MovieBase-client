import React from 'react';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import axios from 'axios';

import MovieCard from '../movie-card/movie-card';
import VisibilityFilterInput from '../filter/filter';

import '../main-view/main-view.scss';
import { useState } from 'react';

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};


function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  const username = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    return axios
      .get("https://moviebased.herokuapp.com/users/" + username, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const idList = response.data.Favorites.map(({ _id }) => _id);
        setFavorites(idList);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [])

  // getUser = (token, username) => {
  //   axios
  //     .get("https://moviebased.herokuapp.com/users/" + username, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     })
  //     .then((response) => {
  //       const idList = response.data.Favorites.map(({ _id }) => _id);
  //       console.log('response data user', response.data);
  //       setUser(response.data);
  //       console.log('response data favs', idList);
  //       setFavorites(idList);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  if (!movies) return <div className="main-view">No movies</div>

  // console.log('user before render', user);

  return <div className="movies">
    <div className="filter-section">
      <VisibilityFilterInput visibilityFilter={visibilityFilter} />
    </div>
    <div className="filtered-movies">
      {filteredMovies.map(m => (
        <div key={m._id}>
          <MovieCard movie={m}
            // user={user}
            favorites={favorites}
          />
        </div>
      ))}
    </div>
  </div>;
}

export default connect(mapStateToProps)(MoviesList);