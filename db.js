var firebase = require('firebase')
var _ = require('lodash')

var firebaseConfig = {
  apiKey: "AIzaSyD8vphZVMMcWIhNwe8okN2Tj5JgQASXYdg",
  authDomain: "doug-holt.firebaseapp.com",
  databaseURL: "https://doug-holt.firebaseio.com",
  projectId: "doug-holt",
  storageBucket: "doug-holt.appspot.com",
  messagingSenderId: "469530549010"
}

var firebaseApp = firebase.apps.length === 0
  ? firebase.initializeApp(firebaseConfig) : firebase.apps[0]

var db = firebaseApp.database()

var getPortfolioRoutes = function () {
  return Promise.all(
    ['posts', 'categories'].map( type =>
      firebase.database()
      .ref(type)
      .once('value')
      .then(i => i.val())
      .then(items => items.map((item, index) => {
        console.log('item', item)
        return type === 'posts' ? ('/journal/' + item.id) : ('/gallery/' + item.name)
      }))
    )
  ).then(values => {
    return values.reduce((a, b) => a.concat(b), []);
  });
}

module.exports = {
  db: db,
  firebase: firebase,
  getPortfolioRoutes: getPortfolioRoutes
}
