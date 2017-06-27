export default function(context) {
  const {app, route, store} = context;

  const to = route;

  store.commit('pageOpen', {to});

  if (to.name == 'gallery-id') {
    let cat = store.getters.getCatByName(to.params.id);
    store.commit('categorySet', cat.index);
  }



}
