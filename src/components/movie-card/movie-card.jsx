import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
export class MovieCard extends React.Component {

  constructor() {
    super();

    this.state = {
      // Favorites: [],
      isInFavs: false
    };
  }

  // getUser = (token, user) => {
  //   axios
  //     .get("https://moviebased.herokuapp.com/users/" + user, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     })
  //     .then((response) => {
  //       const idList = response.data.Favorites.map(({ _id }) => _id);
  //       // console.log('id list', idList);
  //       this.setState({ Favorites: idList });
  //       // this.setState({ Favorites: response.data.Favorites });
  //       console.log('updated state favs', this.state.Favorites);
  //       console.log('calling check favs from get user');
  //       this.checkFavs();
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }

  checkFavs = (movieId) => {
    console.log('<<<------------START----------->>>');
    console.log('favorites from props', this.props.favorites);
    console.log('movieId', movieId);
    if (this.props.favorites.includes(this.props.movie._id)) {
      this.setState({ isInFavs: true })
      console.log('Found in favs props');
      // console.log('is in favs - found in favs', this.state.isInFavs);
      return this.isInFavs;
    }
    console.log('is in favs', this.state.isInFavs);
    console.log('<<<------------END----------->>>');
  }

  componentDidMount = () => {
    const movieId = this.props.movie._id;
    this.checkFavs(movieId);
  }

  render() {
    const { movie } = this.props;
    console.log('is in favs - found in favs', this.state.isInFavs);


    return (
      <div className="card">
        <div className="card-img">
          <img src={movie.ImagePath} alt="movie poster" />
        </div>
        <div className="title">{movie.Title}</div>
        <div className="movie-card-button">
          <Link to={`/movies/${movie._id}`} className="button-primary">See more
          </Link>
        </div>
        {this.state.isInFavs &&
          <p>is in favs</p>}
        {!this.state.isInFavs &&
          <p>is not in favs</p>}
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