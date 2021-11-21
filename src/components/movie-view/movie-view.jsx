import React from 'react';
import axios from 'axios';

import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import './movie-view.scss';
import terminator from '../img/terminator.png';
import { Link } from 'react-router-dom';
export class MovieView extends React.Component {

  addToFavs(movieId) {
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
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view">

        <div className="movie-img">
          <img src={movie.ImagePath} alt="movie poster" />
        </div>

        <div className="movie-info">

          <div className="movie-title">
            <h2>{movie.Title}</h2>
          </div>

          <div className="movie-description">
            <p>{movie.Description}</p>
          </div>

          <div className="director-genre">

            <div className="movie-director">
              <span>Director:</span>
              <Link to={`/directors/${movie.Director.Name}`} className="link">
                {movie.Director.Name}
              </Link>
            </div>

            <div className="movie-genre">
              <span>Genre:</span>
              <Link to={`/genres/${movie.Genre.Name}`} className="link">
                {movie.Genre.Name}
              </Link>
            </div>
          </div>

          <div className="movie-view-buttons">
            <button className="primary-button" onClick={() => { onBackClick(); }} variant="outline-primary" className="button-back">Back</button>
            <button className="primary-button" onClick={() => { this.addToFavs(movie._id); }}>Add to favs</button>
          </div>

        </div>
      </div >


      // <Row className="movie-view">
      //   <Col>
      //     <Card md={9}>
      //       <Card.Body>
      //         {/* <Card.Img variant="left" className="card-img" src={require('../img/terminator.png')} /> */}
      //         <Card.Img variant="left" className="card-img" src={movie.ImagePath} />
      //         <Card.Title>{movie.Title}</Card.Title>
      //         <Card.Text>{movie.Description}</Card.Text>
      //         <Card.Text>
      //           <Row className="movie-details">
      //             <Col>
      //               <span>Director:</span>
      //               <Link to={`/directors/${movie.Director.Name}`} className="link">
      //                 {movie.Director.Name}
      //               </Link>
      //             </Col>
      //             <Col>
      //               <span>Genre:</span>
      //               <Link to={`/genres/${movie.Genre.Name}`} className="link">
      //                 {movie.Genre.Name}
      //               </Link>
      //             </Col>
      //           </Row>
      //         </Card.Text>
      //         <Row md={12} className="button-back-container">
      //           <Button onClick={() => { this.addToFavs() }} variant="outline-primary">Add to favs</Button>
      //           <Button onClick={() => { onBackClick(); }} variant="outline-primary" className="button-back">Back</Button>
      //         </Row>
      //       </Card.Body>
      //     </Card>
      //   </Col>
      // </Row>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string,
    Genre: PropTypes.object,
    Director: PropTypes.object
    // Actors: PropTypes.string,
    // Featured: PropTypes.bool,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};