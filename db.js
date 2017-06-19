var firebase = require('firebase')

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

module.exports = {
  db: db,
  firebase: firebase
}
