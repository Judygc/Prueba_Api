import React from 'react';
import { render } from 'react-dom';
import MainComponent  from './containers/Main';
import { Provider } from 'react-redux';
import store from './redux-stuff/store';


render((
  <Provider store={store}>
    <MainComponent/>
  </Provider>
),document.querySelector('.root'))
