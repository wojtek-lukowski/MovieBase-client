import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import './movie-view.scss';
import terminator from '../img/terminator.png';
export class MovieView extends React.Component {

    render() {
        const { movie, onBackClick } = this.props;
        return (

            <Row>
                <Col md={3}><Image
                    src={movie.ImagePath} />
                </Col>
                <Col>
                    <Card md={9}>
                        <Card.Body>
                            <Card.Title>{movie.Title}</Card.Title>
                            <Card.Text>{movie.Description}</Card.Text>
                            <Card.Text>
                                <Row className="movie-details">
                                    <Col>
                                        <span>Director:</span>
                                        <Link to={`/directors/${movie.Director.Name}`}>
                                            <span>{movie.Director.Name}</span>
                                        </Link>
                                    </Col>
                                    <Col>
                                        <span>Genre:</span>
                                        <Link to={`/genre/${movie.Genre.Name}`}>
                                            <span>{movie.Genre.Name}</span>
                                        </Link>
                                    </Col>
                                </Row>
                            </Card.Text>
                            <Row md={12} className="button-back-container">
                                <Button onClick={() => { onBackClick(); }} variant="outline-primary" className="button-back">Back</Button>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        );
    }
}

MovieView.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string,
        Genre: PropTypes.string,
        Director: PropTypes.string,
        // Actors: PropTypes.string,
        // Featured: PropTypes.bool,
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};