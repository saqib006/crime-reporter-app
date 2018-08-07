import {combineReducers, createStore, applyMiddleware} from 'redux';
import { combineEpics, createEpicMiddleware } from "redux-observable";
import authReducer from './reducer/authReducer';
import crimeReducer from './reducer/crimeReducer';
import {authEpic} from './epic/authEpic';
import {crimeEpic} from './epic/crimeEpic';
import { loadState, saveState } from "../PersistState";

const persistedState = loadState();




let rootReducer = combineReducers({
    authReducer,
    crimeReducer,
    
});

export const rootEpic = combineEpics(

  authEpic.createUserOnFirebase,
  authEpic.updateUserProfile,
  authEpic.authStateChanged,
  authEpic.signInFromFirebase,
  authEpic.signOutFromFirebase,
  crimeEpic.addCrimeOnFirebase,
  crimeEpic.addMissingOnFirebase,
  crimeEpic.addComplainOnFirebase,
  crimeEpic.getCrimeFromFirebase,
  crimeEpic.getComplainFromFirebase,
  crimeEpic.getMissingFromFirebase,
  crimeEpic.updateStatusOnFirebase
 
  
  
  
)

const epicMiddleware = createEpicMiddleware(rootEpic);

const createStoreWithMiddleware = applyMiddleware(epicMiddleware);



export let store = createStore(
    rootReducer,
    persistedState,
    createStoreWithMiddleware
    );

  store.subscribe(()=>{
    saveState(store.getState());
})