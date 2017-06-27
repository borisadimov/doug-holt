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

// var getPortfolioRoutes = function () {
//   return firebase.database()
//     .ref('categories')
//     .once('value')
//     .then(i => i.val())
//     .then(_.values)
//     .then(items => _.sortBy(items, 'priority'))
//     .then(items => items.map((item, index) => {
//       return '/gallery/' + item.name
//     }))
// }

module.exports = {
  db: db,
  firebase: firebase,
  // getPortfolioRoutes: getPortfolioRoutes
}
