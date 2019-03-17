import * as React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { App } from './App';
import { history } from '../../common/history';
import { configureStore } from './store';

const store = configureStore();

render(<Provider store={ store }>
    <Router history={ history }>
        <App/>
    </Router>
</Provider>, document.getElementById('root'));
