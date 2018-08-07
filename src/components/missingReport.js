import { Button,Grid, InputLabel , Input, FormControl, TextField} from '@material-ui/core';
import crimeAction from '../store/action/crimeAction';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import NavBar from '../container/navBar';

class MissingReport extends Component{
    constructor(props){
        super(props);
        this.state = {
            name:'',
            title:'',
            description:'',
            Drawer:false,
        }
        console.log(props)
    }
    changeHandler = eve =>{
        this.setState({[eve.target.name]: eve.target.value})
    }
    toggleDrawer = open => {
        this.setState({ Drawer: open });
      };


      componentWillMount(){
        if(!this.props.user){
            this.props.history.replace('/');
        }
    }

    formHandler = () => {
        let missingInfo = {
            key:new Date().getTime(),
            name:this.state.name,
            title:this.state.title,
            description:this.state.description
        }

        this.props.pushMissing(missingInfo)

        this.setState({
            name:'',
            title:'',
            description:''
        })

     //   this.props.history.replace('/')
    }
    render(){
        return(
            <div style={{flexGrow: 1}}>
           <NavBar openDrawer={this.state.Drawer} toggleDrawer={this.toggleDrawer} />
          

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
                    <InputLabel htmlFor="title">Title</InputLabel>
                    <Input
                        id="title"
                        name="title"
                        value={this.state.title}
                        onChange={this.changeHandler}
                        
                    />
                    </FormControl>

                    <FormControl fullWidth >
            

                    
                    <TextField
                    id="description"
                    label="Write Description"
                    multiline
                    value={this.state.description}
                    onChange={this.changeHandler}
                    margin="normal"
                    name="description"
                    />

                    
                    </FormControl>
                  
                    <FormControl style={{marginTop:20,display:'flex'}}>
                        <Button variant="contained" color="secondary" onClick={this.formHandler}>Submit</Button>
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
        isLoading:state.crimeReducer.isLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        pushMissing: (missingDetail) => {return dispatch(crimeAction.addMissing(missingDetail))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MissingReport);