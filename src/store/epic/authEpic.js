import authAction from '../action/authAction';
import {Observable} from 'rxjs';
import {createUser, updateUserProfile, checkUser, signIn, signOut} from '../firebase/auth';

export class authEpic {

    static createUserOnFirebase(action$){
        return action$.ofType(authAction.SIGNUP_PRO).switchMap(({payload})=> {
            return Observable.fromPromise(createUser(payload)).map((obj)=>{
                return{
                    type:authAction.UPDATE_USER_PRO,
                    payload:payload
                }
            }).catch((err)=>{
                return Observable.of(authAction.signUpErr(err.msg))            
            })
        })
    }


    static updateUserProfile(action$){
        return action$.ofType(authAction.UPDATE_USER_PRO).switchMap(({payload})=>{
            return Observable.fromPromise(updateUserProfile(payload)).map(()=>{
                return{
                    type:authAction.CHECK_USER_PRO
                }
            })
        })
    }

    

    


    static authStateChanged(action$){
        return action$.ofType(authAction.CHECK_USER_PRO).switchMap(({payload})=>{
            return Observable.fromPromise(checkUser()).map(user=>{
                return {
                    type:authAction.CHECK_USER_SUC,
                    payload:user
                }
            })
        })
    }


    static signInFromFirebase(action$){
        return action$.ofType(authAction.SIGNIN_PRO).switchMap(({payload})=>{
            return Observable.fromPromise(signIn(payload)).map((obj)=>{
                return{
                    type:authAction.SIGNIN_SUC,
                    payload: obj.user
                }
            }).catch((err)=>{
                return Observable.of(authAction.signInErr(err.msg))
            })
        })
    }

 


    static signOutFromFirebase(action$){
        return action$.ofType(authAction.SIGNOUT_PRO).switchMap(()=>{
            return Observable.fromPromise(signOut()).map(()=>{
                return {
                    type:authAction.SIGNOUT_SUC,
                    payload:null,
                }
            }).catch((error)=>{
                return Observable.of(authAction.signOutErrr(error.msg))
            })
        })
    }


}