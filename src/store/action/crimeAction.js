
export default class crimeAction{

    static CRIME_PRO = 'CRIME_PRO';
    static CRIME_SUC = 'CRIME_SUC';
    static CRIME_ERR = 'CRIME_ERR';

    static COMPLAIN_PRO = 'ADD_COMPLAIN_PRO';
    static COMPLAIN_SUC = 'ADD_COMPLAIN_SUC';
    static COMPLAIN_ERR = 'ADD_COMPLAIN_ERR';

    static MISSING_PRO = 'MISSING_PRO';
    static MISSING_SUC = 'MISSING_SUC';
    static MISSING_ERR = 'MISSING_ERR';


    static GET_CRIME_PRO = 'GET_CRIME_PRO';
    static GET_CRIME_SUC = 'GET_CRIME_SUC';
    static GET_CRIME_ERR = 'GET_CRIME_ERR';

    static GET_COMPLAIN_PRO = 'GET_ADD_COMPLAIN_PRO';
    static GET_COMPLAIN_SUC = 'GET_ADD_COMPLAIN_SUC';
    static GET_COMPLAIN_ERR = 'GET_ADD_COMPLAIN_ERR';

    static GET_MISSING_PRO = 'GET_MISSING_PRO';
    static GET_MISSING_SUC = 'GET_MISSING_SUC';
    static GET_MISSING_ERR = 'GET_MISSING_ERR';

    static UPDATE_STATUS_PRO = 'UPDATE_STATUS_PRO';
    static CRIME_STATUS = 'CRIME_STATUS';
    static COMPLAIN_STATUS = 'COMPLAIN_STATUS';
    static MISSING_STATUS = 'MISSING_STATUS';



    static addCrime(crimeDetail){
        return{
            type:crimeAction.CRIME_PRO ,
            payload:crimeDetail
        }
    }

    static addCrimeSuc(payload){
        return{
            type: crimeAction.CRIME_SUC,
            payload:payload
        }
    }

    static addCrimeErr(message){
        return{
            type:crimeAction.CRIME_ERR ,
            payload:message
        }
    }




    static addMissing(missingDetail){
        return{
            type:crimeAction.MISSING_PRO ,
            payload:missingDetail
        }
    }

    static addMissingSuc(payload){
        return{
            type: crimeAction.MISSING_SUC,
            payload:payload
        }
    }
    static addMissingErr(message){
        return{
            type: crimeAction.MISSING_ERR,
            payload:message
        }
    }



    static addComplain(complainDetail){
        return{
            type: crimeAction.COMPLAIN_PRO,
            payload:complainDetail
        }
    }
    static addComplainSuc(payload){
        return{
            type: crimeAction.COMPLAIN_SUC,
            payload:payload
        }
    }
    static addComplainErr(message){
        return{
            type: crimeAction.COMPLAIN_ERR,
            payload:message
        }
    }

    static updateStatus(statusUpdate){
        return{
            type:crimeAction.UPDATE_STATUS_PRO,
            payload:statusUpdate
        }
    }

    static getComplain(){
        return{
            type:crimeAction.GET_COMPLAIN_PRO
        }
    }

    static getCrime(){
        return{
            type:crimeAction.GET_CRIME_PRO
        }
    }

    static getMissing(){
        return{
            type:crimeAction.GET_MISSING_PRO
        }
    }
   
}