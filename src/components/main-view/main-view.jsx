import React from 'react';
import axios from 'axios';

import './main-view.scss'

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null
    };
  }

  // componentDidMount() {
  //   axios.get('https://moviebased.herokuapp.com/movies')
  //     .then(response => {
  //       this.setState({
  //         movies: response.data
  //       });
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  getMovies(token) {
    axios.get('https://moviebased.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log('logging out');
    this.setState({
      user: null
    });
  }

  render() {
    const { movies, selectedMovie, user } = this.state;
    if (!user) return (

      <div>

        <div className="landingPage">
          <RegistrationView />
          <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
        </div>

        <div>
          <img src="/img/cinema.jpg" alt="" />
        </div>
      </div>
    )

    // if (selectedMovie) return <MovieView movie={selectedMovie} />;

    if (movies.length === 0) return <div className="main-view">Loading...</div>;

    return (
      <Row className="main-view justify-content-md-center">
        {selectedMovie ? (
          <Col>
            <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
          </Col>
        )
          : movies.map(movie => (
            <Col md={3}>
              <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
            </Col>
          ))
          // < Button > Test</Button>
        }
        <Col>
          <Button variant="outline-primary" className="btn-outline-primary" onClick={() => { this.onLoggedOut() }}>Log out</Button>
        </Col>
      </Row >
    );
  }

}
