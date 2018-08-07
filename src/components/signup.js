import React, {Component} from 'react';
import {connect}  from 'react-redux';
import { Button,Grid, InputLabel , Input, FormControl} from '@material-ui/core';
import Home from './home';
import authAction from '../store/action/authAction';

class SignUp extends Component{
    constructor(props){
        super(props)
        this.state = {
            name:'',
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
            name:this.state.name,
            email:this.state.email,
            pass:this.state.pass
        }

        this.props.addUser(userInfo)
        console.log('user', userInfo)
        this.setState({
            name:'',
            email:'',
            pass:''
        })

       
    }

    render(){
        return(
            <div style={{flexGrow: 1}}>
            
            <Home />

                <Grid container spacing={16} alignItems="center" direction="column" justify="center" >
                    <Grid item xs={12} sm={6}  style={{marginTop:"10%"}}>
                    
                    <FormControl fullWidth >
                    <InputLabel htmlFor="name">Name</InputLabel>
                    <Input
                        id="name"
                        name="name"
                        value={this.state.name}
                        onChange={this.changeHandler}
                        
                    />
                    </FormControl>

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
                        <Button variant="contained" color="secondary" onClick={this.formHandler}>SignUp</Button>
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
        addUser: userDetail => {return dispatch(authAction.signUp(userDetail))},
        checkUser: ()=> {return dispatch(authAction.checkUser())}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUp)