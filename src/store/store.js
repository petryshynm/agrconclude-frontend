import { applyMiddleware, combineReducers, createStore,  compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import { AuthReducer } from './reducers/auth.reducer';
import { UserReducer } from './reducers/user.reducer';
import { DocsReducer } from './reducers/docs.reducer';
import { MainReducer } from './reducers/main.reducer';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    main: MainReducer,
    auth: AuthReducer,
    user: UserReducer,
    docs: DocsReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);