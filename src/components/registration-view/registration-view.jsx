import React from 'react';
import './registration-view.scss';

import { useState } from 'react';

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [birthday, setBirthday] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, birthday);
        props.onLoggedIn(username)
    };

    return (
        <div className="registrationView">
            <div className="loginForm">
                <h1>Create Account</h1>
                <form>
                    <label>
                        Username:
                        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                    </label>
                    <label>
                        Password:
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </label>
                    <label>
                        Birthday:
                        <input type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
                    </label>
                    <button type="submit" onClick={handleSubmit}>Create Account</button>
                </form>
            </div>
        </div>
    );
};

