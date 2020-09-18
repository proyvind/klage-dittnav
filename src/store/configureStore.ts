import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducer';

export default function () {
    return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));
}
