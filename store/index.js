import Vuex from 'vuex';
import { firebase } from '~/db'
import { firebaseMutations, firebaseAction } from 'vuexfire'
import { sortBy, filter } from 'lodash'

const PAGE_HOME          = 'index';
const PAGE_GALLERY       = 'gallery-id';
const PAGE_CONTACTS      = 'contacts';

let ready = Promise.resolve();

function store () {

  const vuexStore = new Vuex.Store({
    strict: true,
    state: {
      user: !!firebase.auth().currentUser,
      categories: [],
      posts: [],
      images: [],
      about: {},
      contacts: {},
      isSet: {
        categories: false,
        posts: false,
        about: false,
        contacts: false,
        images: false
      },
      category: 0,
      showContacts: false,
      direction: 'down',
      pageCurrent: PAGE_HOME,
      pagePrev: PAGE_HOME,

      loadProgress: 0,

      timeoutId: null,

      menuOpened: true,
      mobileMenuOpened: false,
      menuFixed: true,
      menuRightOpened: false,
      disableLoader: false
    },
    mutations: {
      ...firebaseMutations,
      login (state, user) {
        state.user = !!user
        state.isSet = {
          categories: false,
          posts: false,
          about: false,
          contacts: false,
          images: false
        }
      },

      logout (state) {
        state.user = null
      },

      setRef (state, ref) {
        state.isSet[ref] = true;
      },

      categorySet(state, category) {
        const direction = 'up';
        const showContacts = category === state.categories.length;

        state.category = category;
        state.direction = direction;
        state.showContacts = showContacts;
      },

      categoryNext(state) {
        if (state.category === state.categories.length)
          return state;
        const showContacts = state.category === state.categories.length - 1;

        state.category = ++state.category;
        state.direction = 'down';
        state.showContacts = showContacts;
      },

      categoryPrev(state) {
        if (state.category === 0)
          return state;
        const showContacts = false;

        state.category = --state.category;
        state.direction = 'up';
        state.showContacts = showContacts;
      },

      setContacts(state) {
        state.showContacts = true;
        state.direction = 'down';
      },

      hideContacts(state) {
        state.direction = 'up';
        state.showContacts = false;
      },

        pageOpen(state, payload) {
          const to = payload.to;
          const from = payload.from || {};

          let loadProgress = 0;

          let pagePrev = from.name ? from.name : state.pagePrev;
          let prevParams = from.params ? from.params : state.prevParams;

          state.pageCurrent = to.name;
          state.pagePrev = pagePrev;
          state.prevParams = prevParams;
          state.loadProgress = loadProgress;
          //state.menuFixed = state.menuOpened;
          state.menuRightOpened = false
        },

        menuOpen(state) {
          state.menuOpened = true;
          state.menuRightOpened = false;
        },

        makeMenuUnfixed(state) {
          state.menuFixed = false;
        },

        hideLoader(state) {
          state.disableLoader = false;
        },

        showLoader(state) {
          state.disableLoader = true;
        },

        makeMenuFixed(state) {
          state.menuFixed = true;
        },

        menuClose(state) {
          state.menuOpened = false;
        },

        toggleMobileMenu(state) {
          state.mobileMenuOpened = !state.mobileMenuOpened;
        },

        closeMobileMenu(state) {
          state.mobileMenuOpened = false;
        },

        menuRightOpen(state) {
          state.menuRightOpened = true
        },

        menuRightClose(state) {
          state.menuRightOpened = false;
        },

        onLoad(state, progress) {
          if (progress === 100) {
            ready.then(() => {
              vuexStore.dispatch('loadProgress', 100)
            })
          }
          if (progress > state.loadProgress && progress !== 100) {
            state.loadProgress = progress
          }
          else {
            return state;
          }
        },
        setLoadProgress(state, progress){
          state.loadProgress = progress
        }
    },
    getters: {
      user: state => state.user,
      categories: state => state.categories,
      posts: state => state.posts,
      about: state => state.about,
      contacts: state => state.contacts,
      category: state => state.categories[state.category],
      images: state => state.images,

      getCatByName: (state, getters) => (name) => {
        for (let cat of state.categories) {
          if (cat.name.toLowerCase() === name.toLowerCase())
            return cat;
        }
        return null;
      },

      getPost: (state, getters) => (id) => {
        for (let post of state.posts) {
          if (post.id === id)
            return post;
        }
        return null;
      }
    },
    actions: {
      loadProgress({ commit }, progress){
        commit('setLoadProgress', progress)
      },

      login ({ commit }, user) {
        commit('login', user)
      },

      logout ({ commit }) {
        commit('logout')
      },
      throttle(state) {
        ready = new Promise((res, rej) => {
          setTimeout(res, 2000);
        })
      },
      setCategoriesRef: firebaseAction(({
          state,
          commit,
          bindFirebaseRef
        }, ref) => {
        if (state.isSet.categories) return Promise.resolve()
        return new Promise((resolve, reject) => {
          commit('setRef', 'categories')
          bindFirebaseRef('categories', ref, {
            readyCallback: resolve,
            cancelCallback: reject
          })
        })
      }),

      setPostsRef: firebaseAction(({
          state,
          commit,
          bindFirebaseRef
        }, ref) => {
        if (state.isSet.posts) return Promise.resolve()
        return new Promise((resolve, reject) => {
          commit('setRef', 'posts')
          bindFirebaseRef('posts', ref, {
            readyCallback: resolve,
            cancelCallback: reject
          })
        })
      }),

      setAboutRef: firebaseAction(({
          state,
          commit,
          bindFirebaseRef
        }, ref) => {
        if (state.isSet.about) return Promise.resolve()
        return new Promise((resolve, reject) => {
          commit('setRef', 'about')
          bindFirebaseRef('about', ref, {
            readyCallback: resolve,
            cancelCallback: reject
          })
        })
      }),

      setContactsRef: firebaseAction(({
          state,
          commit,
          bindFirebaseRef
        }, ref) => {
        if (state.isSet.contacts) return Promise.resolve()
        return new Promise((resolve, reject) => {
          commit('setRef', 'contacts')
          bindFirebaseRef('contacts', ref, {
            readyCallback: resolve,
            cancelCallback: reject
          })
        })
      }),

      setImagesRef: firebaseAction(({
          state,
          bindFirebaseRef
        }, ref) => {
        if (state.isSet.images) return Promise.resolve()
        return new Promise((resolve, reject) => {
          bindFirebaseRef('images', ref, {
            readyCallback: resolve,
            cancelCallback: reject
          })
        })
      })
    }

  })

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      vuexStore.dispatch('login', { user })
    } else {
      vuexStore.dispatch('logout')
    }
  })

  return vuexStore
}

export default store
