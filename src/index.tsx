import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './f1-main/m1-ui/App';
import {HashRouter as Router} from "react-router-dom";

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <App/>
        </Router>
    </React.StrictMode>,
document.getElementById('root')
)
;
