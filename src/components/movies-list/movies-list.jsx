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

  // const username = localStorage.getItem('user');
  // const token = localStorage.getItem('token');

  // const [favorites, setFavorites] = useState(['61e6fdb4b17167f4e7ed6ccb', '613f3b7746378b95b687fbaa', '613eee1946378b95b687fba4']);
  // const [favorites, setFavorites] = useState([]);
  // const [user, setUser] = useState({ _id: '61ebf0f2f57bef8c46f7f8f8', Username: 'wojtek', Password: '$2b$10$oK8MlgdLjmkG0MF4h2Uv.u1ohehOcfeexO55jS6Eivih6XR5Jx3du', Email: 'wojtek@gmail.com', Birthday: '1972-06-03T00:00:00.000Z', Favorites: ['61e6fdb4b17167f4e7ed6ccb', '613f3b7746378b95b687fbaa', '613eee1946378b95b687fba4'] });

  // const [user, setUser] = useState({});

  // useEffect(() => {
  //   getUser(token, user);
  // }, [favorites])

  // getUser = (token, user) => {
  //   axios
  //     .get("https://moviebased.herokuapp.com/users/" + user, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     })
  //     .then((response) => {
  //       const idList = response.data.Favorites.map(({ _id }) => _id);
  //       setFavorites(idList);
  //       console.log('favorites state m-l', favorites);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }

  // useEffect(() => {
  //   fetchUser(token, username);
  // }, [user.Username])

  // fetchUser = (token, username) => {
  //   axios
  //     .get("https://moviebased.herokuapp.com/users/" + username, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     })
  //     .then((response) => {
  //       console.log('response data', response.data);
  //       console.log('response data favorites', response.data.Favorites);
  //       setUser(response.data);
  //       console.log('user state m-l', user);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }

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
          />
        </div>
      ))}
    </div>
  </div>;
}

export default connect(mapStateToProps)(MoviesList);