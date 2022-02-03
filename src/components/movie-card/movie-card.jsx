import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
export class MovieCard extends React.Component {

  constructor() {
    super();

    this.state = {
      favorites: [],
      isHeartFull: false,
    };
  }

  getUser = () => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    axios
      .get("https://moviebased.herokuapp.com/users/" + user, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const favIdList = response.data.Favorites.map(({ _id }) => _id);
        this.setState({ favorites: favIdList });
      })
      .then(() => {
        const movieId = this.props.movie._id;
        this.setIsInFavs(movieId)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  setIsInFavs = (movieId) => {
    if (this.state.favorites.includes(movieId)) {
      this.setState({ isHeartFull: true })
    } else {
      this.setState({ isHeartFull: false })
    }
  }

  toggleFavs = (movieId) => {
    console.log('is in favs', this.state.isInFavs);
    if (this.state.isHeartFull) {
      console.log('favorites state before removing', this.state.favorites);
      this.setState({ isHeartFull: false })
      this.removeFromFavs(movieId);
      this.getUser();
    } else {
      console.log('favorites state before adding', this.state.favorites);
      this.setState({ isHeartFull: true })
      this.addToFavs(movieId);
      this.getUser();
    }
  }

  toggleHeart = (movieId) => {
    if (this.state.isHeartFull) {
      this.setState({ isHeartFull: false });
      this.removeFromFavs(movieId);
      console.log(this.props.movie.Title, this.props.movie._id, ' has been added');
    } else {
      this.setState({ isHeartFull: true });
      this.addToFavs(movieId);
      console.log(this.props.movie.Title, this.props.movie._id, ' has been removed');
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

  componentDidMount = () => {
    console.log('running componentDidMount');
    this.getUser();
  }

  render() {
    const { movie } = this.props;

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
          {/* {this.state.isInFavs &&
            <div className="button-primary" onClick={() => this.toggleFavs(movie._id)}>Remove</div>
          }
          {!this.state.isInFavs &&
            <div className="button-primary" onClick={() => this.toggleFavs(movie._id)}>Add</div>
          } */}
          {this.state.isHeartFull &&
            <div className="button-primary is-in-favs" onClick={() => this.toggleHeart(movie._id)}>Remove</div>
          }
          {!this.state.isHeartFull &&
            <div className="button-primary" onClick={() => this.toggleHeart(movie._id)}>Add to favs</div>
          }
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