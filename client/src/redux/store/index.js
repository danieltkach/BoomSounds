import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';

import productsReducer from '../products/reducer';
import categoriesReducer from '../categories/reducer';
import productCartReducers from '../cart/reducer';
import userReducer from '../users/reducer';

import reviewsReducer from "../reviews/reducer"

import playReducer from '../playPreview/reducer';

import { combineReducers } from 'redux';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const allReducers = combineReducers({
  products: productsReducer,
  categories: categoriesReducer,
  productCart: productCartReducers,
  users: userReducer,
  reviews: reviewsReducer,
  playReducer: playReducer

});

let store = createStore(allReducers, composeEnhancer(applyMiddleware(thunk)));

export default store;
