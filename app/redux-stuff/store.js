import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducers';

const middleware = applyMiddleware(thunk);

 const rootReducer = combineReducers({
    ["app"]: reducer
  })

const store = createStore(rootReducer, middleware);

export default store;
