import React from 'react';
import './registration-view.scss';

import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');


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

    const handleRegister = (e) => {
        e.preventDefault();
        console.log(username, password, email, birthday);
        props.onLoggedIn(username)
    };

    return (
        <Form className="form">
            <h2>Create Account</h2>
            <Form.Group>
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username"></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Birthday:</Form.Label>
                <Form.Control type="date" value={birthday} onChange={e => setBirthday(e.target.value)} placeholder="Birthday"></Form.Control>
            </Form.Group>
            <div className="form-button">
                <Button variant="outline-primary" type="submit" onClick={handleRegister}>Create Account</Button>
            </div>
        </Form>
    )
};

