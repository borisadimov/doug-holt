import {getCatByName} from '~/store/fixtures'

export default function({app, route, store}) {

  if (route.name !== 'index') {
    store.commit('makeMenuUnfixed');
    store.commit('menuClose')
  }
  else {
    store.commit('makeMenuFixed');
    store.commit('menuOpen')
  }

  app.router.beforeEach((to, from, next) => {
    store.commit('pageOpen', {to, from, next});

    if (to.name == 'Gallery-cat') {
      let cat = getCatByName(to.params.cat);
      store.commit('categorySet', cat.index);
    } else if (to.name !== 'contacts' && to.name !== from.name) {
      store.commit('categorySet', 0);
    }

    next();
  });

}
