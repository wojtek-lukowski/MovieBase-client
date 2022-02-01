import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <div className="card">
        {/* <Link to={`/movies/${movie._id}`}> */}
        <div className="card-link">
          <div className="card-img">
            <img src={movie.ImagePath} alt="movie poster" />
          </div>
          <div className="title">{movie.Title}</div>
          {/* <div className="text">{movie.Description}</div> */}
        </div>
        {/* </Link> */}
        <div className="movie-card-button">
          <Link to={`/movies/${movie._id}`} className="button-primary">See more
          </Link>
        </div>
      </div>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string,
    Description: PropTypes.string
  }).isRequired
};