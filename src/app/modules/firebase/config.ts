import * as firebase from 'firebase';
interface IFirebaseConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  messagingSenderId: string;
  projectId: string;
  storageBucket: string;
}

const config: IFirebaseConfig = {
  apiKey: 'AIzaSyAyWYP4VS7IYAn4pz4xVcqvDT4K4AXXLb4',
  authDomain: 'poker-hands-123.firebaseapp.com',
  databaseURL: 'https://poker-hands-123.firebaseio.com',
  messagingSenderId: '501304823469',
  projectId: 'poker-hands-123',
  storageBucket: ''
};

firebase.initializeApp(config);

export const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  signInSuccessUrl: '/signedIn'
};

export default firebase;
