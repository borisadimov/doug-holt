import { firebase } from '~/db'
import { firebaseMutations, firebaseAction } from 'vuexfire'

export const state = {
  user: !!firebase.auth().currentUser,
  categories: [],
  posts: [],
  about: {},
  contacts: {},
  category: 0,
  showContacts: false,
  direction: 'down'
}

export const mutations = {
  ...firebaseMutations,
  login (state, user) {
    state.user = !!user
  },

  logout (state) {
    state.user = null
  },

  categorySet(state, category) {
    const direction = category < state.category ? 'up' : 'down';
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
  },

  hideContacts(state) {
    state.showContacts = false;
  }
}

export const actions = {
  login ({ commit }, user) {
    commit('login', user)
  },

  logout ({ commit }) {
    commit('logout')
  },

  setCategoriesRef: firebaseAction(({
      bindFirebaseRef
    }, ref) => {
    return new Promise((resolve, reject) => {
      bindFirebaseRef('categories', ref, {
        readyCallback: resolve,
        cancelCallback: reject
      })
    })
  }),

  setPostsRef: firebaseAction(({
      bindFirebaseRef
    }, ref) => {
    return new Promise((resolve, reject) => {
      bindFirebaseRef('posts', ref, {
        readyCallback: resolve,
        cancelCallback: reject
      })
    })
  }),

  setAboutRef: firebaseAction(({
      bindFirebaseRef
    }, ref) => {
    return new Promise((resolve, reject) => {
      bindFirebaseRef('about', ref, {
        readyCallback: resolve,
        cancelCallback: reject
      })
    })
  }),

  setContactsRef: firebaseAction(({
      bindFirebaseRef
    }, ref) => {
    return new Promise((resolve, reject) => {
      bindFirebaseRef('contacts', ref, {
        readyCallback: resolve,
        cancelCallback: reject
      })
    })
  })
}

export const getters = {
  user: state => state.user,
  categories: state => state.categories,
  posts: state => state.posts,
  about: state => state.about,
  contacts: state => state.contacts,

  getCatByName: (state, getters) => (name) => {
    for (let cat of state.categories) {
      if (cat.name === name)
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
}
