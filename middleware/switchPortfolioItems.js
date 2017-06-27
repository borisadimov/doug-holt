export default function({app, route, store}) {

  app.router.beforeEach((to, from, next) => {
    store.commit('pageOpen', {to, from, next});
    if (to.name == 'gallery-id') {
      let cat = store.getters.getCatByName(to.params.id);
      store.commit('categorySet', cat.index);
    }

    next();
  });

}
