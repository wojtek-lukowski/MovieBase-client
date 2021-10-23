import React from 'react';
import './login-view.scss';

import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        props.onLoggedIn(username)
    };

    return (
        <Form className="form">
            <h2>Log In</h2>
            <Form.Group>
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username"></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"></Form.Control>
            </Form.Group>
            <div className="form-button">
                <Button variant="outline-primary" type="submit" onClick={handleSubmit}>Log in</Button>
            </div>
        </Form>
    )


    // return (
    //     <div className="loginView">
    //         <div className="loginForm">
    //             <h1>Log in</h1>
    //             <form>
    //                 <label>
    //                     Username:
    //                     <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
    //                 </label>
    //                 <label>
    //                     Password:
    //                     <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
    //                 </label>
    //                 <button type="submit" onClick={handleSubmit}>Log in</button>
    //             </form>
    //         </div>
    //     </div>
    // );

};

