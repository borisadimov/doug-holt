import {store} from 'index';
import {categories} from 'store/fixtures';

export const CATEGORY_SET   = 'sunroof/portfolio/CATEGORY_SET';
export const CATEGORY_NEXT  = 'sunroof/portfolio/CATEGORY_NEXT';
export const CATEGORY_PREV  = 'sunroof/portfolio/CATEGORY_PREV';


export function categorySet(category) {
  return {
    type: CATEGORY_SET,
    category
  }
}

export function categoryNext() {
  return {
    type: CATEGORY_NEXT
  }
}

export function categoryPrev() {
  return {
    type: CATEGORY_PREV
  }
}

let initalState = {
  category: 0,
  showContacts: false,
  direction: 'down'
};

export default function portfolioReducer(state = initalState, action) {
  let showContacts;
  
  switch (action.type) {
    case CATEGORY_SET:
      let direction = action.category < state.category ? 'up' : 'down';
      showContacts = action.category === categories.length;
      return {
        category: action.category,
        direction,
        showContacts
      };

    case CATEGORY_NEXT:
      if (state.category === categories.length)
        return state;
      showContacts = state.category === categories.length - 1;
      return {
        category: state.category + 1,
        direction: 'down',
        showContacts
      };
      
    case CATEGORY_PREV:
      if (state.category === 0)
        return state;
      showContacts = false;
      return {
        category: --state.category,
        direction: 'up',
        showContacts
      };
      
    default:
      return state;
  }
}
