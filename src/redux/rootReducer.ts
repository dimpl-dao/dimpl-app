import {combineReducers} from 'redux';
import {appReducer} from './appReducer';

export type RootState = {
  app: ReturnType<typeof appReducer>;
};

const rootReducer = combineReducers({
  app: appReducer,
});

export default rootReducer;
