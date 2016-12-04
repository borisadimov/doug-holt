import {combineReducers} from 'redux';

import * as nav from './nav';
import * as portfolio from './portfolio';

export default {
  rootReducer: combineReducers({
    nav: nav.default,
    portfolio: portfolio.default,
  }),
  actions: {
    nav,
    portfolio
  }
};
