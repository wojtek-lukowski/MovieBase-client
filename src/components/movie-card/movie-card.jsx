import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
export class MovieCard extends React.Component {

  constructor() {
    super();

    this.state = {
      Favorites: [],
      isInFavs: false,
    };
  }

  getUser = (token, user) => {
    axios
      .get("https://moviebased.herokuapp.com/users/" + user, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const idList = response.data.Favorites.map(({ _id }) => _id);
        // console.log('id list', idList);
        this.setState({ Favorites: idList });
        // this.setState({ Favorites: response.data.Favorites });
        console.log('updated state favs', this.state.Favorites);
        console.log('calling check favs from get user');
        this.checkFavs();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  checkFavs = (movieId) => {
    // const movieId = this.props.movie._id;
    console.log('executing check Favs');
    console.log('movieId', movieId);
    if (this.state.Favorites.includes(this.props.movie._id)) {
      console.log('check fav', this.state.Favorites);
      // console.log('check movie', this.state.movieId);
      this.setState({ isInFavs: true })
      console.log('is in favs', this.state.isInFavs);
      return isInFavs;
    }
  }

  componentDidMount = () => {
    console.log('compenent did mount init');
    console.log('state favs before', this.state.Favorites);
    console.log('state is in favs before', this.state.isInFavs);
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    this.getUser(token, user)
  }

  render() {
    const { movie } = this.props;
    // const { isInFavs } = this.state;
    // console.log('movie', movie);
    const movieId = this.props.movie._id;
    console.log('movie id', movieId);
    // console.log('Favorites', this.Favorites);

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