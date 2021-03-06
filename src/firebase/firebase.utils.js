import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config ={
  apiKey: "AIzaSyB0LFz5tilk7I24Pp2qmSt2gehLnP1PMs4",
  authDomain: "crwn-db-2f3ac.firebaseapp.com",
  projectId: "crwn-db-2f3ac",
  storageBucket: "crwn-db-2f3ac.appspot.com",
  messagingSenderId: "214420592123",
  appId: "1:214420592123:web:960d7639fc8c46ac2fe75e",
  measurementId: "G-E8HFKMQ9TW"
};
firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
