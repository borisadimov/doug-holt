import { firebase } from '~/db'
import { firebaseMutations, firebaseAction } from 'vuexfire'

export const state = {
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
  direction: 'down'
}

export const mutations = {
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

export const getters = {
  user: state => state.user,
  categories: state => state.categories,
  posts: state => state.posts,
  about: state => state.about,
  contacts: state => state.contacts,
  category: state => state.categories[state.category],
  images: state => state.images,

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
