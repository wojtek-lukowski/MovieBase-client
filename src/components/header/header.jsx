import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import './header.scss';

export class Header extends React.Component {
    render() {
        const { onLoggedOut, user } = this.props;

        return (
            <div className="header">
                <div className="header-profile ">
                    <Link to={`/user/${user}`}>
                        <button className="button-primary">Profile</button>
                    </Link>
                </div>
                <div className="header-log-out">
                    <button className="button-primary" onClick={() => { onLoggedOut(); }}> Log out</button>
                </div>
            </div>
        );
    }
}