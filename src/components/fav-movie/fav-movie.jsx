import React from 'react';
import axios from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import "./fav-movie.scss";
export class FavMovie extends React.Component {

    render() {
        const { movie, removeFav, fav } = this.props;

        function favRemoved() {
            alert(`${movie.Title} has been removed.`)
        }

        console.log(movie);

        return (

            <div className="card">
                {/* <Link to={`/movies/${movie._id}`}> */}
                <div className="">
                    <div className="card-img">
                        <img src={movie.ImagePath} alt="movie poster" />
                    </div>
                    <div className="title">{movie.Title}</div>
                    {/* <div className="text">{movie.Description}</div> */}
                </div>
                {/* </Link> */}
                <div className="centered">
                    <Link to={`/movies/${movie._id}`} className="button-primary">See more</Link>
                    <button className="button-primary" onClick={() => { removeFav(movie._id), favRemoved(), location.reload() }}>Remove</button>
                </div>
            </div>
        );
    }
}

FavMovie.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string,
        Director: PropTypes.string,
        ImagePath: PropTypes.string,
    }).isRequired
};