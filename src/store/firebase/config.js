import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyDhxPSK-aWVrFZEGli2pgZAHS6BvVgm8RA",
  authDomain: "crime-reporter-react.firebaseapp.com",
  databaseURL: "https://crime-reporter-react.firebaseio.com",
  projectId: "crime-reporter-react",
  storageBucket: "crime-reporter-react.appspot.com",
  messagingSenderId: "293120350914"
  };

  var fireObj = firebase.initializeApp(config);

  export default fireObj;

  