import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setVersion } from 'atatus-spa';

export default function MovieCard(props) {

  const { movie, favorites } = props;
  const movieId = movie._id;

  const [isInFavs, setIsInFavs] = useState(false);

  useEffect(() => {
    // const favs = localStorage.getItem('favorites');
    // this.setState({ favorites: JSON.parse(favs) });
    // console.log('>>>---START---<<<');
    console.log('running useEffect');
    waitForFavs(movieId);
    // this.setIsInFavs(movieId);
  }, [])

  checkFavs = (movieId) => {
    // const Id = this.props.movie._id;
    // const idList = this.props.user.Favorites.map(({ _id }) => _id);
    // console.log('favs', idList)
    console.log('movieId', movieId);
    if (favorites.includes(movieId)) {
      console.log('>>>---START---<<<')
      console.log('favs', idList)
      console.log('movieId', movieId)
      console.log('>>>---END---<<<')
      setIsInFavs({ isInFavs: true })
    } else {
      setIsInFavs({ isInFavs: false })
    }
  }

  // toggleFavs = (movieId) => {
  //   console.log('is in favs', this.state.isInFavs);
  //   if (this.state.isInFavs) {
  //     console.log('favorites state before removing', this.state.favorites);
  //     this.setState({ isInFavs: false })
  //     this.removeFromFavs(movieId);
  //     this.getUser();
  //   } else {
  //     console.log('favorites state before adding', this.state.favorites);
  //     this.setState({ isInFavs: true })
  //     this.addToFavs(movieId);
  //     this.getUser();
  //   }
  // }

  // toggleHeart = (movieId) => {
  //   if (this.state.isInFavs) {
  //     this.setState({ isInFavs: false });
  //     this.removeFromFavs(movieId);
  //     console.log(this.props.movie.Title, this.props.movie._id, ' has been removed');
  //   } else {
  //     this.setState({ isInFavs: true });
  //     this.addToFavs(movieId);
  //     console.log(this.props.movie.Title, this.props.movie._id, ' has been added');
  //   }
  // }

  // addToFavs = (movieId) => {
  //   const username = localStorage.getItem("user");
  //   const token = localStorage.getItem("token");

  //   axios
  //     .post(
  //       `https://moviebased.herokuapp.com/users/${username}/movies/` + movieId,
  //       {},
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     )
  //     .then((response) => {
  //       // console.log(response);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }

  // removeFromFavs = (movieId) => {
  //   const username = localStorage.getItem('user');
  //   const token = localStorage.getItem('token');

  //   axios.delete(`https://moviebased.herokuapp.com/users/${username}/movies/` + movieId, {
  //     headers: { Authorization: `Bearer ${token}` }
  //   })
  //     .then((response) => {
  //       // console.log(response);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }

  waitForFavs = (movieId) => {
    console.log('wait for favs running');
    if (favorites) {
      console.log('prop favs should be here', favorites);
      this.checkFavs(movieId);
    } else {
      this.waitForFavs(movieId);
      console.log('waiting for favs');
    }
  }

  console.log('render props.favorites', favorites);


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
        {isInFavs &&
          <div className="button-primary is-in-favs" onClick={() => this.toggleHeart(movie._id)}>Remove</div>
        }
        {!isInFavs &&
          <div className="button-primary" onClick={() => this.toggleHeart(movie._id)}>Add to favs</div>
        }
      </div>
    </div>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string,
    Description: PropTypes.string
  }).isRequired
};
