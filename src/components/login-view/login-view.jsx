import React from 'react';
import './login-view.scss';
import axios from 'axios';

import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://moviebased.herokuapp.com/login', {
      Username: username,
      Password: password
    })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log('error:', e);
        alert('There was a problem with your login. Please try again.');
        window.open('/', '_self');
      });
  };

  return (
    <Form>
      <h2>Log In</h2>
      <Form.Group controlId="formUsername">
        <Form.Label>Username: </Form.Label>
        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username"></Form.Control>
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Password: </Form.Label>
        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"></Form.Control>
      </Form.Group>
      <div className="form-actions">
        {/* <button className="button-primary" type="submit" onClick={handleSubmit}>Log in</button> */}
        {!loading &&
          <button className="button-primary" type="submit" onClick={(e) => { handleSubmit(e); setLoading(true) }}>Log in</button>
        }
        {loading &&
          // <button className="button-primary" type="submit"><div className="loading"></div></button>
          <button className="button-primary button-loading" type="submit"><div className="loading"></div></button>
        }
      </div>
    </Form >
  )
}

const mapDispatchToProps = (dispatch) => ({
  handleSubmit: (username, password) => dispatch(handleSubmit(username, password))
});

export default connect(null, mapDispatchToProps)(LoginView);

