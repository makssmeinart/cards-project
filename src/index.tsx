import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './f1-main/m1-ui/App';
import {HashRouter as Router} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./f1-main/m2-bll/store";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <App/>
            </Router>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)

