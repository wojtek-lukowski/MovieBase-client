import React from 'react';
import './registration-view.scss';

import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { Link } from 'react-router-dom';


export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');


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
                widonw.open('/', '_self');
            })
            .catch(e => {
                console.log('Error registering the user')
            });
    }

    const validate = (e) => {
        const usernameError = {}
        const passwordError = {}
        const emailError = {}

        let isValid = true;

        //Conditions
        if (username.trim().length < 5) {
            usernameError.usernameShort = "Username must have at least  5 characters."
            isValid = false;
        }

        if (password.trim().length < 5) {
            passwordError.passwordMissing = "Your password must contain  at least 6 characters."
            isValid = false;
        }

        if (!email.includes(".") || !email.includes("@")) {
            emailError.emailNotEmail = "Enter a valid email"
            isValid = false;
        }

        setUsernameError(usernameError);
        setPasswordError(passwordError);
        setEmailError(emailError);
        return isValid;
    }

    return (
        <Row>
            <Col>
                <Form className="form">
                    <h2>Create Account</h2>
                    <Form.Group>
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} onInput={validate} placeholder="Username"></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} onInput={validate} placeholder="Password"></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} onInput={validate} placeholder="Email"></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Birthday:</Form.Label>
                        <Form.Control type="date" value={birthday} onChange={e => setBirthday(e.target.value)} onInput={validate} placeholder="Birthday"></Form.Control>
                    </Form.Group>

                    <Button variant="outline-primary" type="submit" onClick={handleRegister}>Create Account</Button>

                </Form>
            </Col>
            <Col>
                <Link to={`/`}>
                    <Button >Back to login</Button>
                </Link>
            </Col>
        </Row>
    )
};

