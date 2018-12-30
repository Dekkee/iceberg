import sagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware, Store, Action, compose } from 'redux';

import { root } from '../sagas';
import { State, reducer } from '../reducers';

export const configureStore = (): Store<{}> => {
    const sagaMW = sagaMiddleware();

    const middleware = [ sagaMW ];

    let composeEnhancers = compose;

    if (process.env.NODE_ENV !== 'production') {
        middleware.push(createLogger());
        // @ts-ignore
        composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    }

    const store = createStore<State, Action, {}, {}>(
        reducer, composeEnhancers(applyMiddleware(...middleware))
    );

    sagaMW.run(root);

    return store;
};
