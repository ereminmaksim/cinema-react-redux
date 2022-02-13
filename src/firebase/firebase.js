import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "это ваши данные!!!",
    authDomain: "netflix-build-redux.firebaseapp.com",
    projectId: "netflix-build-redux",
    storageBucket: "netflix-build-redux.appspot.com",
    messagingSenderId: "865450176034",
    appId: "1:865450176034:web:8eef3b970f1e2b81e8e47b"
};


const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
const auth = firebase.auth()

export {auth, firebase}
export default db
