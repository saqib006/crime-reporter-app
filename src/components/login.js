import React, {Component} from 'react';
import {connect}  from 'react-redux';
import { Button,Grid, InputLabel , Input, FormControl} from '@material-ui/core';
import Home from './home';
import authAction from '../store/action/authAction';

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email:'',
            pass:'',
        }
        console.log(props)
    }
    changeHandler = eve =>{
        this.setState({[eve.target.name]: eve.target.value})
    }

    formHandler = () => {
        let userInfo = {
            email:this.state.email,
            pass:this.state.pass
        }
        console.log(userInfo)
        this.props.user(userInfo)
        this.setState({
            email:'',
            pass:''
        })
        this.props.history.replace('/')
    }

    render(){
        return(
            <div style={{flexGrow: 1}}>
            <Home />

                <Grid container spacing={16} alignItems="center" direction="column" justify="center" >
                    <Grid item xs={12} sm={6}  style={{marginTop:"5%"}}>
                    
                   

                    <FormControl fullWidth >
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input
                        id="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.changeHandler}
                        
                    />
                    </FormControl>

                    <FormControl fullWidth >
                    <InputLabel htmlFor="pass">Password</InputLabel>
                    <Input
                    type="password"
                        id="pass"
                        name="pass"
                        value={this.state.pass}
                        onChange={this.changeHandler}
                        
                    />
                    </FormControl>
                  
                    <FormControl style={{marginTop:20,display:'flex'}}>
                        <Button variant="contained" color="secondary" onClick={this.formHandler}>Signin</Button>
                    </FormControl>
                      
                    </Grid>
                </Grid>
                
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return{
        user:state.authReducer.user,
        isLoading:state.authReducer.isLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        user: userDetail => {return dispatch(authAction.signIn(userDetail))}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)