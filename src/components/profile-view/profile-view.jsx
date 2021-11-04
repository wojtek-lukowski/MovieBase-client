import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';


import './profile-view.scss'

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { Header } from '../header/header';
import { FavMovie } from '../fav-movie/fav-movie';
import { Row, Col, Button, Form } from 'react-bootstrap';
// import Col from 'react-bootstrap/Col';
// import Button from 'react-bootstrap/Button';
import cinema from '../img/cinema.jpg'

export class ProfileView extends React.Component {

    // copy start
    constructor() {
        super();

        this.state = {
            Username: null,
            Password: null,
            Email: null,
            Birthday: null,
            Favorites: []
        };
    }

    componentDidMount() {
        const accessToken = localStorage.getItem('token');
        this.getUser(accessToken);
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        });
        window.open('/', '_self');
    }

    // Get The Current User

    getUser(token) {
        const username = localStorage.getItem('user');
        axios.get(`https://moviebased.herokuapp.com/users/${username}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => {
                this.setState({
                    Username: response.data.Username,
                    Password: response.data.Password,
                    Email: response.data.Email,
                    Birthday: response.data.Birthday,
                    Favorites: response.data.Favorites
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    // Edit The Current User

    editUser(e) {
        e.preventDefault();
        const username = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        axios.put(`https://moviebased.herokuapp.com/users/${username}`,
            {
                Username: this.state.Username,
                Password: this.state.Password,
                Email: this.state.Email,
                Birthday: this.state.Birthday
            },
            {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((response) => {
                this.setState({
                    Username: response.data.Username,
                    Password: response.data.Password,
                    Email: response.data.Email,
                    Birthday: response.data.Birthday
                });
                localStorage.setItem('user', this.state.Username);
                const data = response.data;
                console.log(data);
                console.log(this.state.Username);
                alert(username + " has been updated!");
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    // Delete A Favorite Movie From Users Favorite 

    onUnfavorite(id) {
        const username = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        axios.delete(`https://moviebased.herokuapp.com/users/${username}/movies/` + (id), {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => {
                console.log(response);
                this.componentDidMount();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    // Delete A User

    onDeleteUser() {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('user');
        axios.delete(`https://moviebased.herokuapp.com/users/${username}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => {
                console.log(response);
                alert(username + ' has been deleted.');
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                window.open('/', '_self');
            })
            .catch(function (error) {
                console.log(error);
            })
    }


    setUsername(value) {
        this.state.Username = value;
    }

    setPassword(value) {
        this.state.Password = value;
    }

    setEmail(value) {
        this.state.Email = value;
    }

    setBirthday(value) {
        this.state.Birthday = value;
    }
    //copy end

    render() {
        const { user, onBackClick, onLoggedOut } = this.props;
        console.log(this.state.Username); //undefined

        return (
            <div className="profile-view">
                <Header onClick={() => this.onLoggedOut()} />
                <Button onClick={() => { onBackClick(); }} variant="outline-primary" className="button-back">Back</Button>
                {/* <h1>Hello, {user}</h1> user = username - passed from main-view */}
                <h1>Hello, {this.state.Username}</h1>
                <h1>Email: {this.state.Email}</h1>
                <h1>Born: {this.state.Birthday}</h1>
                <h2>Your favorite movies:</h2>
                <div className="favorite-movies">
                    {this.state.Favorites.map(fav => (
                        <div md={3} key={fav._id}>
                            <FavMovie movie={fav} onUnfavorite={this.onUnfavorite} />
                        </div>
                    ))}
                </div>

                <Form className="update-form">
                    <h2>Update your data</h2>
                    <Form.Group>
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="text" onChange={e => this.setUsername(e.target.value)} placeholder="Username"></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" onChange={e => this.setPassword(e.target.value)} placeholder="Password"></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="email" onChange={e => this.setEmail(e.target.value)} placeholder="Email"></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Birthday:</Form.Label>
                        <Form.Control type="date" onChange={e => this.setBirthday(e.target.value)} placeholder="Birthday"></Form.Control>
                    </Form.Group>

                    <Button variant="outline-primary" type="submit" onClick={this.editUser}>Submit</Button>

                </Form>

                <div className="">
                    <Button variant="danger" onClick={() => this.onDeleteUser()} >Delete Profile</Button>
                </div>
            </div>
        );
    }
}
