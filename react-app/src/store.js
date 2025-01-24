import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';  // Use named import for thunk
import rootReducer from './redux/reducers';  // Ensure this path is correct

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
