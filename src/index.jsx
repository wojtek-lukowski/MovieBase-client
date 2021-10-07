import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';

class movieBaseApplication extends React.Component {
    render() {
        return (
            <div className="movie-base">
                <div>Good morning</div>
            </div>
        );
    }
}

const container = document.getElementsByClassName('app-container')[0];

ReactDOM.render(React.createElement(movieBaseApplication), container);