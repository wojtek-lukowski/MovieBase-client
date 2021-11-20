import React from "react";
import axios from "axios";

import { connect } from "react-redux";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

import "./main-view.scss";

import { setMovies } from "../../actions/actions";
import MoviesList from "../movies-list/movies-list";
import { RegistrationView } from "../registration-view/registration-view";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { ProfileView } from "../profile-view/profile-view";
import { Header } from "../header/header";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
    }
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  getMovies(token) {
    axios
      .get("https://moviebased.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    console.log("logging out");
    this.setState({
      user: null,
    });
  }

  render() {
    const { movies } = this.props;
    const { user } = this.state;

    return (
      <Router>
        <Row className="main-view">
          <Route
            exact
            path="/"
            render={() => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    <Link to={`/register`}>
                      <a className="btn-create-account">
                        Create Account
                      </a>
                    </Link>
                  </Col>
                );
              if (movies.length === 0)
                return <div className="loading">Loading...</div>;
              return (
                <div>
                  <header>
                    <div>
                      {" "}
                      <h4>
                        Welcome, <span>{user}</span>
                      </h4>
                    </div>
                    <div className="log-out">
                      <Link to={`/user/${user}`}>
                        <Button className="btn-log-out">Profile</Button>
                      </Link>
                    </div>
                    <div className="log-out">
                      <Button
                        className="btn-log-out"
                        onClick={() => this.onLoggedOut()}
                      >
                        {" "}
                        Log out
                      </Button>
                    </div>
                  </header>
                  <MoviesList movies={movies} />;
                </div>
              );
            }}
          />

          <Route
            path="/register"
            render={() => {
              if (user) return <Redirect to="/" />;
              return (
                <Col>
                  <RegistrationView />
                </Col>
              );
            }}
          />

          <Route
            exact
            path="/user/:Username"
            render={({ history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0)
                return <div className="main-view">Loading...</div>;
              return (
                <div>
                  <ProfileView
                    user={user}
                    onBackClick={() => history.goBack()}
                  />
                </div>
              );
            }}
          />

          <Route
            exact
            path="/movies/:MovieId"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0)
                return <div className="main-view">Loading...</div>;
              return (
                <Col md={8}>
                  <MovieView
                    movie={movies.find((m) => m._id === match.params.MovieId)}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          <Route
            exact
            path="/directors/:Name"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0)
                return <div className="main-view">Loading...</div>;
              return (
                <Col md={8}>
                  <DirectorView
                    director={
                      movies.find((m) => m.Director.Name === match.params.Name)
                        .Director
                    }
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          <Route
            exact
            path="/genres/:Name"
            render={({ match, history, Description, Movies }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0)
                return <div className="main-view">Loading...</div>;
              console.log(movies);
              return (
                <Col md={8}>
                  <GenreView
                    genre={
                      movies.find((m) => m.Genre.Name === match.params.Name)
                        .Genre
                    }
                    onBackClick={() => history.goBack()}
                    Description={Description}
                    Movies={Movies}
                  />
                </Col>
              );
            }}
          />

          {/* <Route exact path="/actors/:name" render={({ match }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view">Loading...</div>;
            return <Col md={8}>
              <ActorView actor={movies.find(m => m.Actor.Name === match.params.name).Actor} onBackClick={() => history.goBack()} />
            </Col>
          }} /> */}
        </Row>
      </Router>
    );
  }
}

let mapStateToProps = (state) => {
  return { movies: state.movies };
};

export default connect(mapStateToProps, { setMovies })(MainView);
