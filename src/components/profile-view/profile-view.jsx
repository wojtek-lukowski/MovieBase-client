import React from 'react';
import axios from 'axios';

import { setUser, updateUser } from '../../actions/actions';

import { connect } from 'react-redux';

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

export class ProfileView extends React.Component {

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

  getGenre(token) {
    const { genre } = this.props;
    axios.get(`https://moviebased.herokuapp.com/genre/${genre.Name}`, {
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

  editUser(e) {
    e.preventDefault();
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    console.log('event', e);

    axios
      .put(
        `https://moviebased.herokuapp.com/users/${username}`,
        {},
        {
          Username: this.state.Username,
          Password: this.state.Password,
          Email: this.state.Email,
          Birthday: this.state.Birthday,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
        });
        localStorage.setItem("user", this.state.Username);
        const data = response.data;
        console.log('data', data);
        console.log("this.state.Username", this.state.Username);
        alert(username + " has been updated!");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  removeFromFavs(id) {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.delete(`https://moviebased.herokuapp.com/users/${username}/movies/` + (id), {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  removeUser() {
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

  render() {
    const { user, onBackClick } = this.props;
    console.log(this.state.Username); //undefined

    return (
      <div className="profile-view">
        <Header user={user} logOut={() => this.onLoggedOut()} />
        <div className="profile-buttons">
          <button onClick={() => { onBackClick(); }} className="button-primary">Back</button>
          <a href="#data" className="button-primary">Your data</a>
        </div>

        <div className="favorite-movies">
          <h2>Your favorite movies:</h2>
          <div className="filtered-movies">
            {this.state.Favorites.map(fav => (
              <div key={fav._id}>
                <FavMovie key={fav._id} movie={fav} removeFav={this.removeFromFavs} />
              </div>
            ))}
          </div>
        </div>

        <div className="user" id="data">

          <div className="user-data">
            <h2>Your data</h2>
            <h4>Your username: <span>{this.state.Username}</span></h4>
            <h4>Your Email: <span>{this.state.Email}</span></h4>
            <h4>Your Birthdate: <span>{this.state.Birthday}</span></h4>

            <div className="remove-user">
              <button className="button-remove" onClick={() => this.removeUser()} >Remove your account</button>
            </div>
          </div>
          <Form className="user-update" onSubmit={(e) => this.editUser(e)}>
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
            <div className="user-update-button">
              <button className="button-primary" type="submit" onClick={this.editUser}>Submit</button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    user: state.user,
    movies: state.movies
  }
}

export default connect(mapStateToProps, { setUser, updateUser })(ProfileView);
