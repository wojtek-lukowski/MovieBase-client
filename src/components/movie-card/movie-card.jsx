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

  // componentDidMount = () => {

  //   const movieId = this.props.movie._id;

  //   console.log('taking time');
  //   setTimeout(
  //     this.checkFavs(movieId), 10000
  //   )
  // }

  render() {
    const { movie } = this.props;
    console.log('is in favs - found in favs', this.state.isInFavs);


    return (
      <div className="card">
        <div className="card-img">
          <img src={movie.ImagePath} alt="movie poster" />
        </div>
        <div className="title">{movie.Title}
          {this.state.isInFavs &&
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 3C4.239 3 2 5.216 2 7.95C2 10.157 2.875 15.395 11.488 20.69C11.6423 20.7839 11.8194 20.8335 12 20.8335C12.1806 20.8335 12.3577 20.7839 12.512 20.69C21.125 15.395 22 10.157 22 7.95C22 5.216 19.761 3 17 3C14.239 3 12 6 12 6C12 6 9.761 3 7 3Z" fill="#FFBF00" stroke="#FFBF00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          }
          {!this.state.isInFavs &&
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 3C4.239 3 2 5.216 2 7.95C2 10.157 2.875 15.395 11.488 20.69C11.6423 20.7839 11.8194 20.8335 12 20.8335C12.1806 20.8335 12.3577 20.7839 12.512 20.69C21.125 15.395 22 10.157 22 7.95C22 5.216 19.761 3 17 3C14.239 3 12 6 12 6C12 6 9.761 3 7 3Z" fill="#404040" stroke="#404040" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

          }</div>
        <div className="movie-card-button">
          <Link to={`/movies/${movie._id}`} className="button-primary">See more
          </Link>
        </div>
        {/* {this.state.isInFavs &&
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 3C4.239 3 2 5.216 2 7.95C2 10.157 2.875 15.395 11.488 20.69C11.6423 20.7839 11.8194 20.8335 12 20.8335C12.1806 20.8335 12.3577 20.7839 12.512 20.69C21.125 15.395 22 10.157 22 7.95C22 5.216 19.761 3 17 3C14.239 3 12 6 12 6C12 6 9.761 3 7 3Z" fill="#FFBF00" stroke="#FFBF00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        }
        {!this.state.isInFavs &&
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 3C4.239 3 2 5.216 2 7.95C2 10.157 2.875 15.395 11.488 20.69C11.6423 20.7839 11.8194 20.8335 12 20.8335C12.1806 20.8335 12.3577 20.7839 12.512 20.69C21.125 15.395 22 10.157 22 7.95C22 5.216 19.761 3 17 3C14.239 3 12 6 12 6C12 6 9.761 3 7 3Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        } */}
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