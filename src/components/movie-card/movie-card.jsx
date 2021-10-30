import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';

import './movie-card.scss'


export class MovieCard extends React.Component {
    render() {
        const { movie } = this.props;

        return (
            <Card className="movie-card">
                <Card.Img variant="top" className="card-img" src={require('../img/terminator.png')} />
                <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text className="text">{movie.Description}</Card.Text>
                    <Row className="movie-card-button">
                        <Link to={`/movies/${movie._id}`}>
                            <Button variant="link">See more</Button>
                        </Link>
                    </Row>
                </Card.Body>
            </Card>
        );
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        ImagePath: PropTypes.string,
    }).isRequired
};