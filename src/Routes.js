import {BrowserRouter as Router, Route} from 'react-router-dom';
import React from 'react';
import Home from './components/home'
import Login from './components/login';
import SignUp from './components/signup';
import CrimeReport from './components/crimeReport';
import MissingReport from './components/missingReport';
import Complain from './components/complain';
import CrimeList from './components/crimeList';
import MissingList from './components/missingList';
import ComplainList from './components/complainList';
import {connect} from 'react-redux';
import crimeAction from './store/action/crimeAction';

const Routing = () =>{
    return(
        <Router>
            <div>
                <Route exact path="/" component={Home}></Route>
                <Route  path="/login" component={Login}></Route>
                <Route  path="/signup" component={SignUp}></Route>
                <Route  path="/crimereport" component={CrimeReport}></Route>
                <Route  path="/missingreport" component={MissingReport}></Route>
                <Route  path="/complain" component={Complain}></Route>
                <Route  path="/crimes" component={CrimeList}></Route>
                <Route  path="/missingpersons" component={MissingList}></Route>
                <Route  path="/complains" component={ComplainList}></Route>

            </div>
        </Router>
    )
}

const mapDispatchToProps = (dispatch) => {
    return{
        getCrime: ()=>{return dispatch(crimeAction.getCrime())},
        getMissing: ()=>{return dispatch(crimeAction.getMissing())},
        getComplain: ()=>{return dispatch(crimeAction.getComplain())},
        
    }
}

export default connect(null, mapDispatchToProps)(Routing);