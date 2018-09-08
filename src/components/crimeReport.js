import { Button,Grid, InputLabel , Input, FormControl, TextField, MenuItem ,Select} from '@material-ui/core';
import crimeAction from '../store/action/crimeAction';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import NavBar from '../container/navBar';

class CrimeReport extends Component{
    constructor(props){
        super(props);
        this.state = {
            title:'',
            description:'',
            city:'',
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

        let crimeInfo = {
            userId:this.props.user.uid,
            city:this.state.city,
            title:this.state.title,
            description:this.state.description
        }

        console.log(crimeInfo)

        this.props.pushCrime(crimeInfo)

       

        this.setState({
            city:'',
            title:'',
            description:''
        })

        //this.props.history.replace('/')
    }
    render(){
        return(
            <div style={{flexGrow: 1}}>
           <NavBar openDrawer={this.state.Drawer} toggleDrawer={this.toggleDrawer} />
          

                <Grid container spacing={16} alignItems="center" direction="column" justify="center" >
                    <Grid item xs={12} sm={6}  style={{marginTop:"10%"}}>
                    

                    <FormControl fullWidth >
                    <InputLabel htmlFor="title">Title</InputLabel>
                    <Input
                        id="title"
                        name="title"
                        value={this.state.title}
                        onChange={this.changeHandler}
                        
                    />
                    </FormControl>

                    <FormControl fullWidth>
                    <InputLabel htmlFor="city">City</InputLabel>
                    <Select
                        value={this.state.city}
                        onChange={this.changeHandler}
                        inputProps={{
                        name: 'city',
                        id: 'city',
                        }}
                    >
                    {
                        this.props.city.map(value => {
                        return <MenuItem value={value}>{value}</MenuItem>
                        })
                    
                    }
                        
                        <MenuItem >sadsada</MenuItem>
                    </Select>
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
        city:state.crimeReducer.city,
        user:state.authReducer.user,
        isLoading:state.crimeReducer.isLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        pushCrime: (crimeDetail) => {return dispatch(crimeAction.addCrime(crimeDetail))},
      
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CrimeReport);