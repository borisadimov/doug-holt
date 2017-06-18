import {categories} from '~/store/fixtures';

export const state = {
  category: 0,
  showContacts: false,
  direction: 'down'
};

export const mutations = {
  categorySet(state, category) {
    const direction = category < state.category ? 'up' : 'down';
    const showContacts = category === categories.length;

    state.category = category;
    state.direction = direction;
    state.showContacts = showContacts;
  },

  categoryNext(state) {
    if (state.category === categories.length)
      return state;
    const showContacts = state.category === categories.length - 1;

    state.category = ++state.category;
    state.direction = 'down';
    state.showContacts = showContacts;

    console.log('categoryNext', state);
  },

  categoryPrev(state) {
    if (state.category === 0)
      return state;
    const showContacts = false;

    state.category = --state.category;
    state.direction = 'up';
    state.showContacts = showContacts;

    console.log('categoryPrev', state);
  }

}
