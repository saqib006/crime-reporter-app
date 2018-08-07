import crimeAction from '../action/crimeAction';
import {getMissing, getCrime, getComplain, addCrimes, addMissing, addComplain, updateStatus} from '../firebase/db';
import {Observable} from 'rxjs';


export class crimeEpic{

    static addCrimeOnFirebase(action$){
        return action$.ofType(crimeAction.CRIME_PRO).switchMap(({payload})=>{
            return Observable.fromPromise(addCrimes(payload)).map((payload)=>{
                return{
                    type:crimeAction.CRIME_SUC,
                    payload:payload
                }
            }).catch((error)=>{
                return Observable.of(crimeAction.addCrimeErr(error.message))
            })
        })
    }

    static addMissingOnFirebase(action$){
        return action$.ofType(crimeAction.COMPLAIN_PRO).switchMap(({payload})=>{
            return Observable.fromPromise(addComplain(payload)).map((payload)=>{
                return{
                    type:crimeAction.COMPLAIN_SUC,
                    payload:payload
                }
            }).catch((error)=>{
                return Observable.of(crimeAction.addComplainErr(error.message))
            })
        })
    }

    static addComplainOnFirebase(action$){
        return action$.ofType(crimeAction.MISSING_PRO).switchMap(({payload})=>{
            return Observable.fromPromise(addMissing(payload)).map((payload)=>{
                return{
                    type:crimeAction.MISSING_SUC,
                    payload:payload
                }
            }).catch((error)=>{
                return Observable.of(crimeAction.addMissingErr(error.message))
            })
        })
    }

    static getCrimeFromFirebase(action$){
        return action$.ofType(crimeAction.GET_CRIME_PRO).switchMap(({payload})=>{
            return Observable.fromPromise(getCrime()).map((array)=>{
                return{
                    type:crimeAction.GET_CRIME_SUC,
                    payload:array
                }
            })
        })
    }
    static getComplainFromFirebase(action$){
        return action$.ofType(crimeAction.GET_COMPLAIN_PRO).switchMap(({payload})=>{
            return Observable.fromPromise(getComplain()).map((array)=>{
                return{
                    type:crimeAction.GET_COMPLAIN_SUC,
                    payload:array
                }
            })
        })
    }
    static getMissingFromFirebase(action$){
        return action$.ofType(crimeAction.GET_MISSING_PRO).switchMap(({payload})=>{
            return Observable.fromPromise(getMissing()).map((array)=>{
                return{
                    type:crimeAction.GET_MISSING_SUC,
                    payload:array
                }
            })
        })
    }

    
    static updateStatusOnFirebase(action$){
        return action$.ofType(crimeAction.UPDATE_STATUS_PRO).switchMap(({payload})=>{
            return Observable.fromPromise(updateStatus(payload)).map((payload)=>{
                if(payload.arrayName === "crime"){
                    return{
                        type:crimeAction.CRIME_STATUS,
                        payload:payload
                    }
                }

                else if(payload.arrayName === "complain"){
                    return{
                        type:crimeAction.COMPLAIN_STATUS,
                        payload:payload
                    }
                }

                else if(payload.arrayName === "missing"){
                    return{
                        type:crimeAction.MISSING_STATUS,
                        payload:payload
                    }
                }
                
            })
        })
    }
}