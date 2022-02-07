import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
export class MovieCard extends React.Component {

  constructor() {
    super();

    this.state = {
      favorites: [],
      isInFavs: false,
      // user: null
    };

  }

  // getUser = () => {
  //   const user = localStorage.getItem('user');
  //   const token = localStorage.getItem('token');
  //   axios
  //     .get("https://moviebased.herokuapp.com/users/" + user, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     })
  //     .then((response) => {
  //       const favIdList = response.data.Favorites.map(({ _id }) => _id);
  //       this.setState({ favorites: favIdList });
  //     })
  //     .then(() => {
  //       const movieId = this.props.movie._id;
  //       this.setIsInFavs(movieId)
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }

  setIsInFavs = (movieId) => {
    const Id = this.props.movie._id;
    // const idList = this.props.user.Favorites.map(({ _id }) => _id);
    // console.log('favs', idList)
    console.log('movieId', Id)
    if (this.state.favorites.includes(Id)) {
      console.log('>>>---START---<<<')
      console.log('favs', idList)
      console.log('movieId', movieId)
      console.log('>>>---END---<<<')
      this.setState({ isInFavs: true })
    } else {
      this.setState({ isInFavs: false })
    }
  }

  toggleFavs = (movieId) => {
    console.log('is in favs', this.state.isInFavs);
    if (this.state.isInFavs) {
      console.log('favorites state before removing', this.state.favorites);
      this.setState({ isInFavs: false })
      this.removeFromFavs(movieId);
      this.getUser();
    } else {
      console.log('favorites state before adding', this.state.favorites);
      this.setState({ isInFavs: true })
      this.addToFavs(movieId);
      this.getUser();
    }
  }

  toggleHeart = (movieId) => {
    if (this.state.isInFavs) {
      this.setState({ isInFavs: false });
      this.removeFromFavs(movieId);
      console.log(this.props.movie.Title, this.props.movie._id, ' has been removed');
    } else {
      this.setState({ isInFavs: true });
      this.addToFavs(movieId);
      console.log(this.props.movie.Title, this.props.movie._id, ' has been added');
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

  waitForFavs = (movieId) => {
    if (this.props.favorites) {
      console.log('prop favs should be here', this.props.favorites);
      this.setIsInFavs(movieId);
    } else {
      this.waitForFavs(movieId);
      console.log('waiting for favs');
    }
  }

  componentDidMount = (movieId) => {
    // const favs = localStorage.getItem('favorites');
    // this.setState({ favorites: JSON.parse(favs) });
    // console.log('>>>---START---<<<');
    console.log('running componentDidMount');
    this.waitForFavs();
    // console.log('favs from storage', this.state.favorites);
    // const Id = this.props.movie._id;
    // console.log('movieId', Id);
    // console.log('movie-card: user from props', this.props.user);
    // console.log('movie-card: favorites from props', this.props.favorites);
    // console.log('>>>---END---<<<');
    // console.log('movie-card: user favorites from props', this.props.user.Favorites);
    // const list = this.props.user.Favorites.map(({ _id }) => _id);
    // console.log('favs from comp did mount', list);
    // this.getUser();
    // this.setIsInFavs(movieId);
  }

  render() {
    const { movie } = this.props;

    console.log(' render props.favorites', this.props.favorites);
    // console.log('state from storage', this.state.favorites);


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
          {this.state.isInFavs &&
            <div className="button-primary is-in-favs" onClick={() => this.toggleHeart(movie._id)}>Remove</div>
          }
          {!this.state.isInFavs &&
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