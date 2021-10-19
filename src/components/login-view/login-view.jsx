import React from 'react';
import './login-view.scss';

import { useState } from 'react';

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        props.onLoggedIn(username)
    };

    return (
        <div className="loginView">
            <div className="loginForm">
                <h1>Log in</h1>
                <form>
                    <label>
                        Username:
                        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                    </label>
                    <label>
                        Password:
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </label>
                    <button type="submit" onClick={handleSubmit}>Log in</button>
                </form>
            </div>
        </div>
    );

};

