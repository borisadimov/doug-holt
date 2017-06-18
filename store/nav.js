import {getCatByName} from '~/store/fixtures';

const PAGE_HOME          = 'home';
const PAGE_GALLERY       = 'gallery';
const PAGE_CONTACTS      = 'contacts';

export const state = {
  pageCurrent: PAGE_HOME,
  pagePrev: PAGE_HOME,

  loadProgress: 0,

  menuOpened: true,
  menuFixed: true,
  menuRightOpened: false
}

export const mutations = {
  pageOpen(state, payload) {
    const to = payload.to;
    const from = payload.from;
    const next = payload.next;

    let menuOpened = false;
    if (to.name == PAGE_HOME || to.name == PAGE_CONTACTS)
      menuOpened = true;

    let loadProgress = 0;
    if ((to.name == PAGE_CONTACTS && !!from.name) || from.name == PAGE_CONTACTS)
      loadProgress = 100;

    if (from.name == PAGE_GALLERY && to.name == PAGE_GALLERY)
      loadProgress = 100;

    let pagePrev = from.name ? from.name : state.pagePrev;
    let prevParams = from.params ? from.params : state.prevParams;

    state.pageCurrent = to.name;
    state.pagePrev = pagePrev;
    state.prevParams = prevParams;
    state.loadProgress = loadProgress;
    state.menuOpened = menuOpened;
    state.menuFixed = menuOpened;
    state.menuRightOpened = false
  },

  menuOpen(state) {
    state.menuOpened = true;
    state.menuRightOpened = false;
  },

  makeMenuUnfixed(state) {
    state.menuFixed = false;
  },

  makeMenuFixed(state) {
    state.menuFixed = true;
  },

  menuClose(state) {
    state.menuOpened = false;
  },

  menuRightOpen(state) {
    state.menuRightOpened = true
  },

  menuRightClose(state) {
    state.menuRightOpened = false;
  },

  onLoad(state, progress) {
    if (progress > state.loadProgress) {
      state.loadProgress = progress
    }
    else {
      return state;
    }
  }
}
