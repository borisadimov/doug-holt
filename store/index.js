import Vue  from 'vue';
import Vuex from 'vuex';
import * as nav from './nav';
import * as firebase from './firebase';
import createLogger from 'vuex/dist/logger'


Vue.use(Vuex)

const store = () => new Vuex.Store({
  modules: {
    nav: nav,
    firebase: firebase
  }
})

export default store
