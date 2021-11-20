import React from 'react';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';

import { MovieCard } from '../movie-card/movie-card';
import VisibilityFilterInput from '../filter/filter';

import '../main-view/main-view.scss';

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visbilityFilter.toLowerCase()));
  }

  if (!movies) return <div className="main-view">No movies</div>

  return <>
    <div className="filter">
      <VisibilityFilterInput visibilityFilter={visibilityFilter} />
    </div>
    {filteredMovies.map(m => (
      <div key={m._id}>
        <MovieCard movie={m} />
      </div>
    ))}
  </>;
}

export default connect(mapStateToProps)(MoviesList);