import React from 'react';
import {Provider} from 'react-redux';
import {applyMiddleware, compose, createStore} from 'redux';
import rootReducer from './rootReducer';
import reduxThunk from 'redux-thunk';
import rootSaga from './rootSaga';
import createSagaMiddleware from 'redux-saga';

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const enhancer = compose(applyMiddleware(sagaMiddleware, reduxThunk));
  const store = createStore(rootReducer, enhancer);
  sagaMiddleware.run(rootSaga);
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
