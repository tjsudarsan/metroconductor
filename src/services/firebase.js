import * as firebase from 'firebase'

 var config = {
    apiKey: "AIzaSyBT14DhUgc_4HMy6fYfuLGNiMezdZxvPJc",
    authDomain: "metro-1516248882253.firebaseapp.com",
    databaseURL: "https://metro-1516248882253.firebaseio.com",
    projectId: "metro-1516248882253",
    storageBucket: "metro-1516248882253.appspot.com",
    messagingSenderId: "743710400749"
};
firebase.initializeApp(config);

var database = firebase.database();

export {database as default};