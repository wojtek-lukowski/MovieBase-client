import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import './header.scss';

export class Header extends React.Component {

  // constructor() {
  //   super();

  //   this.state = {
  //     renderProfileButton: true
  //   };
  // }

  // componentDidMount = () => {
  //   console.log('profile button - did mount', this.props.renderProfileButton);
  // }

  toggleButton = () => {
    // console.log('profile button before',);
    // if (this.props.renderProfileButton) {
    //   this.setState({ renderProfileButton: false })
    // } else {
    //   this.setState({ renderProfileButton: true })
    // }
    // console.log('profile button afetr',);
  }

  render() {
    const { logOut, user } = this.props;
    // const renderProfileButton = this.props;

    return (
      <div className="page-header">
        <div className="header-logo">
          <Link to={"/"} >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M6 3C5.20435 3 4.44129 3.31607 3.87868 3.87868C3.31607 4.44129 3 5.20435 3 6V18C3 18.7956 3.31607 19.5587 3.87868 20.1213C4.44129 20.6839 5.20435 21 6 21H18C18.7956 21 19.5587 20.6839 20.1213 20.1213C20.6839 19.5587 21 18.7956 21 18V6C21 5.20435 20.6839 4.44129 20.1213 3.87868C19.5587 3.31607 18.7956 3 18 3H6ZM5 6C5 5.73478 5.10536 5.48043 5.29289 5.29289C5.48043 5.10536 5.73478 5 6 5H7V7H5V6ZM19 6V7H17V5H18C18.2652 5 18.5196 5.10536 18.7071 5.29289C18.8946 5.48043 19 5.73478 19 6ZM17 11V9H19V11H17ZM17 15V13H19V15H17ZM18 19H17V17H19V18C19 18.2652 18.8946 18.5196 18.7071 18.7071C18.5196 18.8946 18.2652 19 18 19ZM5 18V17H7V19H6C5.73478 19 5.48043 18.8946 5.29289 18.7071C5.10536 18.5196 5 18.2652 5 18ZM7 15H5V13H7V15ZM7 11H5V9H7V11Z" fill="#FFBF00" />
            </svg>
          </Link>
        </div>
        {this.props.renderProfileButton &&
          <div className="header-welcome">
            <h4>Welcome, <span>{user}</span></h4>
          </div>
        }
        {!this.props.renderProfileButton &&
          <div className="header-welcome">
            <h4>See and manage your profile, <span>{user}</span></h4>
          </div>
        }
        <div className="header-buttons">
          {this.props.renderProfileButton &&
            <Link className="button-primary" to={`/user/${user}`}>
              Profile
            </Link>
          }
          {!this.props.renderProfileButton &&
            <Link className="button-primary" to={`/`}>
              Back
            </Link>
          }
          <a className="button-primary"
            onClick={logOut}>Log out</a>
        </div>
      </div >
    );
  }
}