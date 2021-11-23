import React from 'react';
import axios from 'axios';

import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import './genre-view.scss';
import terminator from '../img/terminator.png';
import { Link } from 'react-router-dom';

export class GenreView extends React.Component {

    constructor() {
        super();

        this.state = {
            Description: null,
            Movies: []
        };
    }

    componentDidMount() {
        const accessToken = localStorage.getItem('token');
        this.getGenre(accessToken);
    }

    getGenre(token) {
        const { genre } = this.props;
        axios.get(`https://moviebased.herokuapp.com/genres/${genre.Name}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => {
                this.setState({
                    Description: response.data.Description,
                    Movies: response.data.Movies,
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        const { onBackClick, genre } = this.props;
        const { Description, Movies } = this.state;
        return (
            <div className="director-view">
                <h1>{genre.Name}</h1>
                <div className="director-bio">{Description}</div>
                <div className="genre-movies-list">
                    <div>Other {genre.Name} movies:</div>
                    {Movies.map((movieId) => (
                        <div>{movieId}</div>
                    ))}
                </div>

                <div className="button-centered">
                    <button className="button-primary" onClick={() => { onBackClick(); }}>Back</button>
                </div>
            </div>

        );
    }
}

GenreView.propTypes = {
    genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Movies: PropTypes.array
    }).isRequired
};