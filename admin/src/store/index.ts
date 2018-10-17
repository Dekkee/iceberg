import sagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware, Store, Action } from 'redux';

import { root } from '../sagas';
import { State, reducer } from '../reducers';

export const configureStore = (): Store<{}> => {
    const sagaMW = sagaMiddleware();

    const middleware = [sagaMW];

    if (process.env.NODE_ENV !== 'production') {
        middleware.push(createLogger())
    }

    const store = createStore<State, Action, {}, {}>(
        reducer, applyMiddleware(...middleware)
    );

    sagaMW.run(root);

    return store;
};
