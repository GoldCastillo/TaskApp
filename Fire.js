import firebase from "firebase";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCszT-tpfcZyoexIgm2T_IVwPQzJMVdX4E",
  authDomain: "taskapp-cabb8.firebaseapp.com",
  projectId: "taskapp-cabb8",
  storageBucket: "taskapp-cabb8.appspot.com",
  messagingSenderId: "444070104356",
  appId: "1:444070104356:web:bb71e7bc77e91192f337b1",
};


class Fire {
  constructor(callback) {
    this.init(callback);
  }

  init(callback) {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        callback(null, user);
      } else {
        firebase
          .auth()
          .signInAnonymously()
          .catch((error) => {
            callback(error);
          });
      }
    });
  }
  getLists(callback) {
    let ref = firebase
      .firestore()
      .collection("users")
      .doc(this.userId)
      .collection("lists");

    this.props.unsubscribe = ref.onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        lists.push({ id: doc.id, ...doc.data() });
      });

      callback(lists);
    });
  }

  get userId() {
    return firebase.auth().currentUser.uid;
  }

  detach() {
    this.unsubscribe();
  }
}

export default Fire;
