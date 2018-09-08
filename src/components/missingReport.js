import { Button,Grid, InputLabel , Input, FormControl, TextField, Select, MenuItem} from '@material-ui/core';
import crimeAction from '../store/action/crimeAction';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import NavBar from '../container/navBar';
import firebase from '../store/firebase/config';

class MissingReport extends Component{
    constructor(props){
        super(props);
        this.state = {
            name:'',
            description:'',
            file:'',
            city:'',
            Drawer:false,
        }

    }
    changeHandler = eve =>{

    
        switch (eve.target.name) {
            case 'file':
              this.setState({ file: eve.target.files[0] });
              break;
            default:
              this.setState({ [eve.target.name]: eve.target.value });
          }
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

        const {name , description, file, city} = this.state;
        let storage = firebase.storage()

        const userId = this.props.user.uid

        const uploadImage = storage.ref(`images/${file.name}`).put(this.state.file)
        uploadImage.on('state_changed', (snapshot)=>{
        },(error)=>{
          console.log(error)
        },()=>{
          storage.ref('images').child(file.name).getDownloadURL().then(url => {
            console.log('url',url)


            if(url){
                let missingInfo = {
                    userId:userId,
                    image:url,
                    name:name,
                    description:description,
                    city:city
                }
        
                console.log(missingInfo)
                this.props.pushMissing(missingInfo)
            }

            
          })
        })


        this.setState({
            name:'',
            file:'',
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
                    <InputLabel htmlFor="name">Missing Person Name</InputLabel>
                    <Input
                        id="name"
                        name="name"
                        value={this.state.name}
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
                    <InputLabel htmlFor="file" >
                    Upload Image
                    </InputLabel>
                    <Input id="file" type="file" name="file" onChange={this.changeHandler}/>
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
        pushMissing: (missingDetail) => {return dispatch(crimeAction.addMissing(missingDetail))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MissingReport);