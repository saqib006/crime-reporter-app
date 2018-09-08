import crimeAction from '../action/crimeAction';

const INITIAL_STATE = {
    isLoading:false,
    isError: false,
    errMsg: '',
    crimeList: [],
    missingList:[],
    complainList:[],
    city:["Karachi", "Lahore", "Peshawer", "Quetta", "Faislabad", "Hyderabad", "Sukkhar", "Multan","Abbottabad", "Bani Gala"],
    userCrime:[],
    userComplain:[],
    userMissing:[],
    searchList:[]
}

export default function crimeReducer(state = INITIAL_STATE, action){
    switch(action.type){

        // add all reports........................

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

         
        // get all reports.........................
            
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

        // update staus.....................

        case(crimeAction.UPDATE_STATUS_PRO):
            return Object.assign({}, state, {isLoading:true})

        case(crimeAction.COMPLAIN_STATUS):
            let newComplainList = [...state.complainList];
            let index = newComplainList.findIndex(ele => ele.key === action.payload.key)
            newComplainList[index].status = action.payload.status;
            return Object.assign({}, state, {isLoading:false, complainList:newComplainList});
            

            
        case(crimeAction.MISSING_STATUS):
            let newMissingList = [...state.missingList];
            let index2 = newMissingList.findIndex(ele => ele.key === action.payload.key)
            newMissingList[index2].status = action.payload.status;
            return Object.assign({}, state, {isLoading:false, missingList:newMissingList});

        case(crimeAction.CRIME_STATUS):
            let newCrimeList = [...state.crimeList];
            let index3 = newCrimeList.findIndex(ele => ele.key === action.payload.key)
            newCrimeList[index3].status = action.payload.status;
            return Object.assign({}, state, {isLoading:false, crimeList:newCrimeList});

        ///   user reports .................

        case(crimeAction.GET_USER_COMPLAIN):
            let userComplainList = [...state.complainList]
            return Object.assign({}, state, {userComplain:userComplainList.filter(value => value.userId == action.payload)})

        case(crimeAction.GET_USER_MISSING):
            let userMissingList = [...state.missingList]
            return Object.assign({}, state, {userMissing:userMissingList.filter(value => value.userId == action.payload)})

        case(crimeAction.GET_USER_CRIME):
            let userCrimeList = [...state.crimeList]
            return Object.assign({}, state, {userCrime:userCrimeList.filter(value => value.userId == action.payload)})
     
        // search reports by city .....................

        case(crimeAction.SEARCH_REPORT):
            if(action.payload.array === "crime"){
            let newList = [...state.crimeList]
            const result = newList.filter(value => value.city == action.payload.city)
            return Object.assign({}, state, {searchList:result})
            }

            else if(action.payload.array === "missing"){
            let newList = [...state.missingList]
            const result = newList.filter(value => value.city == action.payload.city)
            return Object.assign({}, state, {searchList:result})
            }

            else if(action.payload.array === "complain"){
            let newList = [...state.complainList]
            const result = newList.filter(value => value.city == action.payload.city)
            return Object.assign({}, state, {searchList:result})
            }
            
                    
                  
        default:
            return state
    }
}