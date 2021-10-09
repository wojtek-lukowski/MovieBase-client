import React from 'react';
import ReactDOM from 'react-dom';
import { MainView } from './components/main-view/main-view';


import './index.scss';



class movieBaseApplication extends React.Component {
    render() {
        return (
            <div className="movie-base">
                <div>Good evening</div>
            </div>
        );
    }
}

const container = document.getElementsByClassName('app-container')[0];

ReactDOM.render(React.createElement(movieBaseApplication), container);