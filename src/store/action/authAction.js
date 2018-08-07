export default class authAction{
    static SIGNIN_PRO = 'SIGNIN_PRO';
    static SIGNIN_ERR = 'SIGNIN_ERR';
    static SIGNIN_SUC = 'SIGNIN_SUC';

    static SIGNUP_PRO = '';
    static SIGNUP_ERR = '';
    static SIGNUP_SUC = '';

    static CHECK_USER_SUC = 'CHECK_USER_SUC';
    static CHECK_USER_PRO = 'CHECK_USER_PRO';

    static UPDATE_USER_PRO = 'UPDATE_USER_PRO';
    
    static SIGNOUT_PRO = 'SIGNOUT_PRO';
    static SIGNOUT_SUC = 'SIGNOUT_SUC';
    static SIGNOUT_ERR = 'SIGNOUT_ERR';

    static signUp(userObj){
        return{
            type:authAction.SIGNUP_PRO,
            payload:userObj
        }
    }

    static signUpErr(msg){
        return{
            type:authAction.signUpErr,
            payload:msg
        }
    }

    static signIn(userPayload){
        return{
            type:authAction.SIGNIN_PRO,
            payload: userPayload
        }
    }

    static signInErr(msg){
        return{
            type: authAction.signInErr,
            payload:msg
        }
    }

    static signOut(){
        return{
            type:authAction.SIGNOUT_PRO
        }
    }

    static signOutSuc(){
        return{
            type:authAction.SIGNOUT_SUC
        }
    }


    static signOutErr(msg){
        return{
            type:authAction.SIGNOUT_ERR,
            payload:msg
        }
    }

    static checkUser(){
        return{
            type: authAction.CHECK_USER_PRO
        }
    }
}