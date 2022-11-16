import React from 'react';
import {Provider} from 'react-redux';
import {applyMiddleware, compose, createStore} from 'redux';
import rootReducer from './rootReducer';
import reduxThunk from 'redux-thunk';

const configureStore = () => {
  const enhancer = compose(applyMiddleware(reduxThunk));
  const store = createStore(rootReducer, enhancer);
  return store;
};

export const withRootReducer = (Component: React.FC) => {
  const store = configureStore();
  return (props: JSX.IntrinsicAttributes) => (
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  );
};
