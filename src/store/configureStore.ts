import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducer';

export default function () {
    return createStore(reducer, applyMiddleware(thunkMiddleware));
}
