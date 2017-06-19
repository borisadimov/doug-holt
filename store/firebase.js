import { firebase } from '~/db'
import { firebaseMutations, firebaseAction } from 'vuexfire'

export const state = {
  user: !!firebase.auth().currentUser,
  categories: [],
  posts: []
}

export const mutations = {
  ...firebaseMutations,
  login (state, user) {
    state.user = !!user
  },

  logout (state) {
    state.user = null
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
}

export const getters = {
  user: state => state.user,
  categories: state => state.categories,
  posts: state => state.posts
}
