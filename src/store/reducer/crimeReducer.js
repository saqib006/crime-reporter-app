import crimeAction from '../action/crimeAction';

const INITIAL_STATE = {
    isLoading:false,
    isError: false,
    errMsg: '',
    crimeList: [],
    missingList:[],
    complainList:[]
}

export default function crimeReducer(state = INITIAL_STATE, action){
    switch(action.type){

        case(crimeAction.CRIME_PRO):
            return Object.assign({}, state, {isLoading:true})
        case(crimeAction.CRIME_SUC):
            return Object.assign({},state,{isLoading:false,crimeList:[...state.crimeList,action.payload]})
        case(crimeAction.CRIME_ERR):
            return Object.assign({}, state, {isErr:true,isLoading:false, errMsg:action.payload})

        case(crimeAction.COMPLAIN_PRO):
            return Object.assign({}, state, {isLoading:true})
        case(crimeAction.COMPLAIN_SUC):
            return Object.assign({},state,{isLoading:false,complainList:[...state.complainList,action.payload]})
        case(crimeAction.COMPLAIN_ERR):
            return Object.assign({}, state, {isErr:true,isLoading:false, errMsg:action.payload})


        case(crimeAction.MISSING_PRO):
            return Object.assign({}, state, {isLoading:true})
        case(crimeAction.MISSING_SUC):
            return Object.assign({},state,{isLoading:false,missingList:[...state.missingList,action.payload]})
        case(crimeAction.MISSING_ERR):
            return Object.assign({}, state, {isErr:true,isLoading:false, errMsg:action.payload})

         
        
            
        case(crimeAction.GET_CRIME_PRO):
            return Object.assign({}, state, {isLoading:true})
        case(crimeAction.GET_CRIME_SUC):
            return Object.assign({}, state,{isLoading:false, crimeList:action.payload})

        case(crimeAction.GET_COMPLAIN_PRO):
            return Object.assign({}, state, {isLoading:true})
        case(crimeAction.GET_COMPLAIN_SUC):
            return Object.assign({}, state,{isLoading:false, complainList:action.payload})

        case(crimeAction.GET_MISSING_PRO):
            return Object.assign({}, state, {isLoading:true})
        case(crimeAction.GET_MISSING_SUC):
            return Object.assign({}, state,{isLoading:false, missingList:action.payload})



        case(crimeAction.UPDATE_STATUS_PRO):
            return Object.assign({}, state, {isLoading:true})

        case(crimeAction.COMPLAIN_STATUS):
            //let index = state.complainList.findIndex(value => value.key === action.payload.key)
            //return Object.assign({}, state, {isLoading:false,complainList:[...state.complainList[index].status = action.payload.status]})
            let object = {...state};
            let index = object.complainList.findIndex(ele => ele.key === action.payload.key)
            object.complainList[index].status = action.payload.status;
            return object;
            
            
            
        case(crimeAction.MISSING_STATUS):
           // let index2 = state.missingList.findIndex(value => value.key === action.payload.key)
          //  return Object.assign({}, state, {isLoading:false,missingList:[...state.missingList[index2].status = action.payload.status]})

            let object2 = {...state};
            let index2 = object2.missingList.findIndex(ele => ele.key === action.payload.key)
            object2.missingList[index2].status = action.payload.status;
            return object2;

        case(crimeAction.CRIME_STATUS):
           // let index3 = state.crimeList.findIndex(value => value.key === action.payload.key)
          //  return Object.assign({}, state, {isLoading:false,crimeList:[...state.crimeList[index3].status = action.payload.status]})
            let object3 = {...state};
            let index3 = object3.crimeList.findIndex(ele => ele.key === action.payload.key)
            object3.crimeList[index3].status = action.payload.status;
            return object3;
            
          
                    
                  
        default:
            return state
    }
}