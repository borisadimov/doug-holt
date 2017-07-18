export default function(context) {
  const {app, route, store} = context;
  const to = route;
  
  store.commit('pageOpen', {to})
  store.dispatch('throttle');
  store.commit('closeMobileMenu');

  store.commit('showLoader');

  if (to.name == 'gallery-id') {
    let cat = store.getters.getCatByName(to.params.id);
    if (cat)
      setTimeout(() => store.commit('categorySet', cat.index ), 1000)
  }
}
