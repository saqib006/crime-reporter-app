import authAction from '../action/authAction';

const INITIAL_STATE = {
    user: null,
    isLoading: false,
    isError: false,
    errMsg: ''
}

export default function authReducer(state = INITIAL_STATE, action){
    switch(action.type){

        case(authAction.SIGNUP_PRO):
            return Object.assign({}, state, {isLoading: true});
        
        case(authAction.SIGNUP_ERR):
            return Object.assign({}, state,{isError: true, errMsg: action.payload});

        case authAction.SIGNUP_SUC:
            break;

        case(authAction.CHECK_USER_PRO):
            return Object.assign({}, state, {isLoading:true});

        case(authAction.CHECK_USER_SUC):
            return Object.assign({}, state, {user:action.payload, isLoading:false});

        case(authAction.SIGNIN_PRO):
            return Object.assign({}, state, {isLoading:true});

        case(authAction.SIGNIN_SUC):
            return Object.assign({}, state, {user:action.payload, isLoading:false});

        case(authAction.SIGNIN_ERR):
            return Object.assign({}, state, {isLoading:false, isError:true, errMsg:action.payload});

        case(authAction.SIGNOUT_PRO):
            return Object.assign({}, state, {isLoading:true});
        
        

        case(authAction.SIGNOUT_SUC):
            return Object.assign({}, state, {isLoading:false, user:action.payload});

        case(authAction.SIGNOUT_ERR):
            return Object.assign({}, state, {isLoading:false, isError: true, errMsg: action.payload});
        
            default:
            return state;
    }
}