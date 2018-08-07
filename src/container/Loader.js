import React, {Component} from 'react';
import {CircularProgress } from '@material-ui/core';
import {connect} from 'react-redux';
import Fade from '@material-ui/core/Fade';
class Loading extends Component{


    conatiner = {
        flex:{
            position:'fixed',
            top: '40%',
            left:'47%',
            zIndex:'9999',
            width:50
            
        }
        
        
    }

    render(){
        return(
                <div style={{flexGrow:1}}>
                <Fade in={this.props.isLoading} unmountOnExit>
                <CircularProgress style={this.conatiner.flex} />
                </Fade>
                </div>
           
        )
    }
}
const mapStateToProps = (state) => {
    return{
        isLoading:state.authReducer.isLoading
    }
}
export default connect(mapStateToProps, null)(Loading)