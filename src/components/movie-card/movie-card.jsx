import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';

// import './movie-card.scss'


export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <div className="card">
        {/* <Link to={`/movies/${movie._id}`}> */}
        <div className="card-link">
          <div className="card-img">
            {/* <Row>
              <Col>
                <Image src={movie.ImagePath} alt="" />
              </Col>
            </Row> */}
            <img src={movie.ImagePath} alt="movie poster" />
          </div>
          <div className="title">{movie.Title}</div>
          {/* <div className="text">{movie.Description}</div> */}
        </div>
        {/* </Link> */}
        <div className="movie-card-button">
          <Link to={`/movies/${movie._id}`} className="button-primary">See more
          </Link>
        </div>

      </div>
      // <Card className="card">
      //     <Link to={`/movies/${movie._id}`}>
      //         <Card.Img variant="top" className="card-img" src={movie.ImagePath} />
      //         <Card.Body>
      //             <Card.Title>{movie.Title}</Card.Title>
      //             <Card.Text className="text">{movie.Description}</Card.Text>
      //             <Row className="movie-card-button">
      //                 <Link to={`/movies/${movie._id}`}>
      //                     <button className="button-primary">See more</button>
      //                 </Link>
      //             </Row>
      //         </Card.Body>
      //     </Link>
      // </Card>
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