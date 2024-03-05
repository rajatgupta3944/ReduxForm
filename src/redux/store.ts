
import {createStore} from 'redux'
import { combineReducers } from 'redux';
import {personalDetailsReducer, addressDetailsReducer} from './reducers/personalDetailsReducer';


const store = createStore(
  combineReducers({
    personalDetails: personalDetailsReducer,
    addressDetails: addressDetailsReducer, 
  })
);

export type RootState = {
    personalDetails: ReturnType<typeof personalDetailsReducer>;
  };
  export type RootState2 = {
    addressDetails: ReturnType<typeof addressDetailsReducer>;
  };
export default store;
