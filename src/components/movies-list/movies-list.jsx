import React from 'react';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { MovieCard } from '../movie-card/movie-card';
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

  const user = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  const [favorites, setFavorites] = useState(['61e6fdb4b17167f4e7ed6ccb', '613f3b7746378b95b687fbaa', '613eee1946378b95b687fba4']);
  // const [favorites, setFavorites] = useState([]);
  // const [currentUser, setUser] = useState('');

  // useEffect(() => {
  //   getUser(token, user);
  // }, [favorites])

  getUser = (token, user) => {
    // console.log(user, token);
    axios
      .get("https://moviebased.herokuapp.com/users/" + user, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const idList = response.data.Favorites.map(({ _id }) => _id);
        // const currentUser = response.data;
        // setUser(currentUser);
        setFavorites(idList);
        // console.log('response data m-l', response.data);
        // console.log('currentUser state m-l', currentUser);
        console.log('favorites state m-l', favorites);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  if (!movies) return <div className="main-view">No movies</div>

  return <div className="movies">
    <div className="filter-section">
      <VisibilityFilterInput visibilityFilter={visibilityFilter} />
    </div>
    <div className="filtered-movies">
      {filteredMovies.map(m => (
        <div key={m._id}>
          <MovieCard movie={m}
            favorites={favorites}
          />
        </div>
      ))}
    </div>
  </div>;
}

export default connect(mapStateToProps)(MoviesList);