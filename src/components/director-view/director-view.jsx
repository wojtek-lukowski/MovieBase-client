import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import './director-view.scss';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

export class DirectorView extends React.Component {
    render() {
        const { onBackClick, director } = this.props;

        if (!director.Death) return (

            <div className="director-view">
                <h1>{director.Name}</h1>
                <div className="director-image" src={require('../img/terminator.png')}></div>
                <div className="director-bio">{director.Bio}</div>
                <div className="director-life">
                    <div className="director-birth">
                        <div className="director-birth-label">Born:</div>
                        <div className="director-birth-date">{director.Birth}</div>
                    </div>
                </div>
                <div className="director-movies">
                    {/* <div>
                        <h4>Other movies:</h4>
                        <div className="director-movies-list">{director.Movies.map(movie => <p key={movie}>{movie}</p>)}</div>
                    </div> */}
                </div>
                <button className="button-primary" onClick={() => { onBackClick(); }}>Back</button>
            </div>
        );

        return (

            <div className="director-view">
                <h1>{director.Name}</h1>
                <div className="director-image" src={require('../img/terminator.png')}></div>
                <div className="director-bio">{director.Bio}</div>
                <div className="director-life">
                    <div className="director-birth">
                        <div className="director-birth-label">Born:</div>
                        <div className="director-birth-date">{director.Birth}</div>
                    </div>
                    <div className="director-death">
                        <div className="director-death-label">Died:</div>
                        <div className="director-death-date">{director.Death}</div>
                    </div>
                </div>
                <div className="director-movies">
                    <div>
                        <h4>Other movies:</h4>
                        <div className="director-movies-list">{director.Movies.map(movie => <p>{movie}</p>)}</div>
                    </div>
                </div>

                <div className="button-centered">
                    <button className="button-primary" onClick={() => { onBackClick(); }}>Back</button>
                </div>

            </div>
        );
    }
}

DirectorView.propTypes = {
    director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string,
        Birth: PropTypes.string,
        Death: PropTypes.string,
        Movies: PropTypes.array
    }).isRequired
};