import 'babel-polyfill';
import Vue from 'vue';
import VueRouter from 'vue-router';

import configureStore from 'store/configureStore';
import App from './App';
import Home from 'components/Home';
import About from 'components/About';
import Contacts from 'components/Contacts';
import Gallery from 'components/Gallery';
import Journal from 'components/Journal';
import JournalItem from 'components/JournalItem';
import {pageOpen} from 'ducks/nav';


export const PAGE_HOME          = 'home';
export const PAGE_GALLERY       = 'gallery';
export const PAGE_ABOUT         = 'about';
export const PAGE_JOURNAL       = 'journal';
export const PAGE_JOURNAL_ITEM  = 'journal_item';
export const PAGE_CONTACTS      = 'contacts';

export const store = configureStore();

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      name: PAGE_HOME,
      path: '/',
      component: Home
    },
    {
      name: PAGE_GALLERY,
      path: '/gallery/:cat',
      component: Gallery
    },
    {
      name: PAGE_ABOUT,
      path: '/about',
      component: About
    },
    {
      name: PAGE_JOURNAL,
      path: '/journal',
      component: Journal
    },
    {
      name: PAGE_JOURNAL_ITEM,
      path: '/journal/:item',
      component: JournalItem
    },
    {
      name: PAGE_CONTACTS,
      path: '/contacts',
      component: Contacts
    }
  ]
});

router.beforeEach((to, from, next) => {
  store.dispatch(pageOpen(to, from, next));
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
