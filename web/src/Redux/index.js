import {
    createStore,
    applyMiddleware,
    compose,
    combineReducers
} from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import { createBlacklistFilter } from 'redux-persist-transform-filter';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import {reducer as toastrReducer} from 'react-redux-toastr';
import immutablePersistenceTransform from '../Common/Services/ImmutablePersistenceTransform';
import rootSaga from '../Sagas';

import storage from 'redux-persist/lib/storage';

const saveSubsetBlacklistFilter = createBlacklistFilter(
    'auth',
    [
        'error',
        'fetching'
    ]
);

const persistConfig = {
    key: 'root',
    storage,
    transforms: [saveSubsetBlacklistFilter, immutablePersistenceTransform]
};

const history = createHistory();

const reducers = combineReducers({
    auth: require('../Common/Redux/AuthRedux').reducer,
    toastr: toastrReducer

});
const middleware = [];
const enhancers = [];

middleware.push(logger);

middleware.push(routerMiddleware(history));

const sagaMiddleware = createSagaMiddleware();

middleware.push(sagaMiddleware);
enhancers.push(applyMiddleware(...middleware));
const persistedReducer = persistReducer(persistConfig, reducers);

let store =  createStore(persistedReducer, compose(...enhancers));
let persistor = persistStore(store);
let sagasManager = sagaMiddleware.run(rootSaga);

export default () => {
    return { store, persistor, sagasManager, history }
}
