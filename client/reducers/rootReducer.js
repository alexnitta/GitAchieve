import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import score from './scoreReducer';
import tokens from './tokensReducer';
import authReducer from './authReducer';
import userReducer from './userReducer';
import {reducer as formReducer} from 'redux-form';
import searchResults from './searchResultsReducer';
import searchInput from './searchInputReducer';
import searchUserEvents from './userEventsReducer';
import chosenSearchResultReducer from './chosenSearchResultReducer';

export default combineReducers({
  score,
  tokens,
  routing: routerReducer,
  auth: authReducer,
  user: userReducer,
  searchResults,
  searchInput,
  searchUserEvents,
  chosenSearchResultReducer
});
