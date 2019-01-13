import * as firebase from "firebase";
//import firestore from "firebase/firestore";

const settings = { timestampsInSnapshots: true };

const config = {
  apiKey: "AIzaSyAOa2IWmm9aLOY4Cpk1c_Tqbjybjg9xWtc",
  authDomain: "hhm-blog.firebaseapp.com",
  databaseURL: "https://hhm-blog.firebaseio.com",
  projectId: "hhm-blog",
  storageBucket: "hhm-blog.appspot.com",
  messagingSenderId: "176386660930"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

const storage = firebase.storage();

export { storage, firebase as default };
