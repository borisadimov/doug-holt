import {store, PAGE_HOME, PAGE_CONTACTS, PAGE_GALLERY} from 'index';
import {getCatByName} from 'store/fixtures';
import {categorySet} from './portfolio';

export const PAGE_OPEN        = 'app/nav/PAGE_OPEN';
export const MENU_OPEN        = 'app/nav/MENU_OPEN';
export const MENU_CLOSE       = 'app/nav/MENU_CLOSE';
export const MENU_RIGHT_OPEN  = 'app/nav/MENU_RIGHT_OPEN';
export const MENU_RIGHT_CLOSE = 'app/nav/MENU_RIGHT_CLOSE';

export const ON_LOAD          = 'app/nav/ON_LOAD';


export function pageOpen(to, from, next) {
  return dispatch => {
    dispatch({
      type: PAGE_OPEN,
      to,
      from
    });

    if (to.name == PAGE_GALLERY) {
      let cat = getCatByName(to.params.cat);
      store.dispatch(categorySet(cat.index));
    } else if (to.name !== PAGE_CONTACTS && to.name !== from.name) {
      store.dispatch(categorySet(0));
    }

    next();
  };
}

export function menuOpen() {
  return {
    type: MENU_OPEN
  };
}
export function menuClose() {
  return {
    type: MENU_CLOSE
  };
}

export function menuRightOpen() {
  return {
    type: MENU_RIGHT_OPEN
  };
}
export function menuRightClose() {
  return {
    type: MENU_RIGHT_CLOSE
  };
}

export function onLoad(progress) {
  return {
    type: ON_LOAD,
    progress
  };
}

const initialState = {
  pageCurrent: PAGE_HOME,
  pagePrev: PAGE_HOME,

  loadProgress: 0,

  menuOpened: true,
  menuFixed: true,
  menuRightOpened: false

};


export default function navReducer(state = initialState, action) {
  switch (action.type) {
    case PAGE_OPEN:
      let menuOpened = false;
      if (action.to.name == PAGE_HOME || action.to.name == PAGE_CONTACTS)
        menuOpened = true;

      let loadProgress = 0;
      if (action.to.name == PAGE_CONTACTS || action.from.name == PAGE_CONTACTS)
        loadProgress = 100;

      if (action.from.name == PAGE_GALLERY && action.to.name == PAGE_GALLERY)
        loadProgress = 100;

      let pagePrev = action.from.name ? action.from.name : state.pagePrev;

      return {
        ...state,
        pageCurrent: action.to.name,
        pagePrev,
        loadProgress,
        menuOpened,
        menuFixed: menuOpened,
        menuRightOpened: false
      };

    case MENU_OPEN:
      return {...state, menuOpened: true, menuRightOpened: false};

    case MENU_CLOSE:
      return {...state, menuOpened: false};

    case MENU_RIGHT_OPEN:
      return {...state, menuRightOpened: true};

    case MENU_RIGHT_CLOSE:
      return {...state, menuRightOpened: false};

    case ON_LOAD:
      if (action.progress > state.loadProgress)
        return {...state, loadProgress: action.progress};
      else
        return state;

    default:
      return state;
  }
}
