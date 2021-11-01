import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import './director-view.scss';
import terminator from '../img/terminator.png';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

export class DirectorView extends React.Component {
    render() {
        const { onBackClick, director } = this.props;

        return (

            <div className="director-view">
                <h1>{director.Name}</h1>
                <div className="director-image" src={require('../img/terminator.png')}></div>
                <div className="director-bio">{director.Bio}</div>
                <div className="director-birth">{director.Birth}</div>
                <div className="director-movies">{director.Movies}</div>
                <Button onClick={() => { onBackClick(); }} variant="outline-primary" className="button-back">Back</Button>
            </div>

        );
    }
}