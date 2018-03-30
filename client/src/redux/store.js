import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import teacher from './reducers/teacher';
import feedback from './reducers/feedback';
import classes from './reducers/classes';


const combinedReducers = combineReducers({
    teacher,
    classes,
    feedback
});

const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

let store;

if (reduxDevtools) {
    store = createStore(combinedReducers, reduxDevtools(applyMiddleware(thunk)));
} else {
    store = createStore(combinedReducers, applyMiddleware(thunk));
}

export default store;
