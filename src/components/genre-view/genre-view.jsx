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

    // constructor() {
    //     super();

    //     this.state = {
    //         Description: null,
    //         Movies: []
    //     };
    // }

    // componentDidMount() {
    //     const accessToken = localStorage.getItem('token');
    //     this.getGenre(accessToken);
    //     console.log('test');
    // }

    // getGenre(token) {
    //     const { genre } = this.props;
    //     axios.get(`https://moviebased.herokuapp.com/genre/${genre.Name}`, {
    //         headers: { Authorization: `Bearer ${token}` }
    //     })
    //         .then((response) => {
    //             this.setState({
    //                 Description: response.data.Description,
    //                 Movies: response.data.Movies,
    //             });
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         })
    // }

    render() {
        const { onBackClick, genre, Description, Movies } = this.props;
        console.log('genre', genre); //description and movies are missing???
        console.log(Description);
        console.log(Movies);

        return (

            <div className="genre-view">
                <h1>{genre.Name}</h1>
                <div className="genre-description">{genre.Description}</div>
                <div className="genre-movies">{genre.Movies}</div>
                <Button onClick={() => { onBackClick(); }} variant="outline-primary" className="button-back">Back</Button>
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