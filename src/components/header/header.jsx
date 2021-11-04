import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import './header.scss'

export class Header extends React.Component {
    render() {
        const { onLoggedOut } = this.props;

        return (
            <div>
                <div className="log-out">
                    <Button className="btn-log-out">Profile</Button>
                </div>
                <div className="log-out">
                    <Button className="btn-log-out" onClick={() => onLoggedOut()}> Log out</Button>
                </div>
            </div>
        );
    }
}