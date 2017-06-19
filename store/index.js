import Vue  from 'vue';
import Vuex from 'vuex';
import * as portfolio from './portfolio';
import * as nav from './nav';
import * as user from './user';

Vue.use(Vuex)

const store = () => new Vuex.Store({
  modules: {
    portfolio: portfolio,
    nav: nav,
    user: user
  }
})

export default store
