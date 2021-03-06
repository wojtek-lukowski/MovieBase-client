import React from 'react';
import './registration-view.scss';

import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

import "./registration-view.scss";


export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const [usernameError, setUsernameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    axios.post('https://moviebased.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
      .then(response => {
        const data = response.data;
        console.log(data);
        window.open('/', '_self');
      })
      .catch(e => {
        console.log('Error registering the user', e)
        alert("Sorry, something went wrong. Please, try again.");
        window.open('/register', '_self');
      });
  };

  const validate = (e) => {
    let isValid = true;

    //Conditions
    if (username.trim().length < 5) {
      setUsernameError("Username must have at least 5 characters.");
      isValid = false;
    }

    if (password.trim().length < 5) {
      setPasswordError("Your password must contain at least 6 characters.");
      isValid = false;
    }

    if (!email.includes(".") || !email.includes("@")) {
      setEmailError("Enter a valid email");
      isValid = false;
    }

    return isValid;
  };

  return (
    <div>
      <Form className="form">
        <h2>Create Account</h2>
        <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            // onBlur={validate}
            placeholder="Username"
          ></Form.Control>
          {usernameError && <p className="error-message">{usernameError}</p>}
        </Form.Group>
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // onBlur={validate}
            placeholder="Password"
          ></Form.Control>
          {passwordError && <p className="error-message">{passwordError}</p>}
        </Form.Group>
        <Form.Group>
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // onBlur={validate}
            placeholder="Email"
          ></Form.Control>
          {emailError && <p className="error-message">{emailError}</p>}
        </Form.Group>
        <Form.Group>
          <Form.Label>Birthday:</Form.Label>
          <Form.Control
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            // onBlur={validate}
            placeholder="Birthday"
          ></Form.Control>
        </Form.Group>

        <div className="form-actions">
          {!loading &&
            <button
              className="button-primary"
              type="submit"
              onClick={(e) => { validate(); handleRegister(e); setLoading(true) }}>Create Account</button>
          }
          {loading &&
            <button className="button-primary button-loading" type="submit"><div className="loading"></div></button>
          }
        </div>
      </Form>
    </div>
  )
}

