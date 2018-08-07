import firebase from './config';

export function createUser(payload) {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.pass);
  }

export function updateUserProfile(payload){
    return firebase.auth().currentUser.updateProfile({
        displayName:payload.name
    });
}

export function checkUser(){
    return new Promise((res, rej) => {
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                res(user)
            }
            else{
                res(null)
            }
        });
    });
}

export function signIn (payload) { 
    return firebase.auth().signInWithEmailAndPassword(payload.email, payload.pass);
}

export function signOut (){
    return firebase.auth().signOut();
}