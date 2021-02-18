import firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyDtj9C1PwjcBbsg4w4Oq4lsKakkyKAC2VA',
  authDomain: 'cumpleannos-react-native.firebaseapp.com',
  databaseURL: 'https://cumpleannos-react-native.firebaseio.com',
  projectId: 'cumpleannos-react-native',
  storageBucket: 'cumpleannos-react-native.appspot.com',
  messagingSenderId: '1011041067439',
  appId: '1:1011041067439:web:406cd8379794f40bd4cf5a',
};

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);
