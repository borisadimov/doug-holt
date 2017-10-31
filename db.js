var firebase = require("firebase");
var _ = require("lodash");

var firebaseConfig = {
  apiKey: "AIzaSyDhcvWf9-B65pI8MJ_A_gVpyevtcwujj20",
  authDomain: "juse-bac90.firebaseapp.com",
  databaseURL: "https://juse-bac90.firebaseio.com",
  projectId: "juse-bac90",
  storageBucket: "juse-bac90.appspot.com",
  messagingSenderId: "1071306502546"
};

var firebaseApp =
  firebase.apps.length === 0 ? firebase.initializeApp(firebaseConfig) : firebase.apps[0];

var db = firebaseApp.database();

var getPortfolioRoutes = function() {
  return Promise.all(
    ["posts", "categories"].map(type =>
      firebase
        .database()
        .ref(type)
        .once("value")
        .then(i => i.val())
        .then(items =>
          items.map((item, index) => {
            console.log("item", item);
            return type === "posts" ? "/journal/" + item.id : "/gallery/" + item.name;
          })
        )
    )
  ).then(values => {
    return values.reduce((a, b) => a.concat(b), []);
  });
};

module.exports = {
  db: db,
  firebase: firebase,
  getPortfolioRoutes: getPortfolioRoutes
};
