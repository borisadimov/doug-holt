export default function(context) {
  const {app, route, store} = context;

  const to = route;

  store.commit('hideLoader');

  console.log(to)

}
