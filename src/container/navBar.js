import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Drawer, MenuItem, List, ListItem, ListItemText, ListItemIcon, Divider } from '@material-ui/core';
import {IconButton, Button, AppBar, Typography,Toolbar} from '@material-ui/core';
import Person from "@material-ui/icons/Person";
import MenuIcon from '@material-ui/icons/Menu';
import {Link} from 'react-router-dom';
import authAction from '../store/action/authAction';
class NavBAR extends Component{
    constructor(props){
        super(props);

        console.log(props)

        this.state = {
            Drawer:false
        }
    }
   

    componentWillMount(){
        if(this.props.user){
            this.setState({
                Drawer:true
            })
        }
        else{
            this.setState({
                Drawer:false
            })
        }
    }

   

    

    render(){
        const user = this.props.user
        return(
            <div>

                  <AppBar position="static">
                
                <Toolbar>
                <IconButton color="inherit" aria-label="Menu" onClick={()=> this.props.toggleDrawer(this.state.Drawer)}>
                    <MenuIcon />
                </IconButton>
                <Typography style={{flexGrow: 1}} variant="title" color="inherit" >
                    Crime Reporter
                </Typography>
               {
                   user ? (<Link to="/"><Button  color="inherit" onClick={this.props.logout}>Logout</Button></Link> ) : (<UserAction/>)
               }
                
          
                </Toolbar>
                
                </AppBar>
           <Drawer open={this.props.openDrawer} onClose={()=>this.props.toggleDrawer(false)}>
            <div
                tabIndex={0}
                role="button"
                onClick={()=>this.props.toggleDrawer(false)}
                onKeyDown={()=>this.props.toggleDrawer(false)}
            >
            <List>
            <ListItem>
            <ListItemIcon>
                  <Person/>
            </ListItemIcon>
            <ListItemText>{user ? user.displayName : ''}</ListItemText>
            </ListItem>
            </List>
           <Divider/>
           <MenuItem><Link style={{color:'black'}} to="/">Dashboard</Link></MenuItem>
              <MenuItem><Link style={{color:'black'}} to="complain">Add Complain Report</Link></MenuItem>
               <MenuItem><Link style={{color:'black'}} to="crimereport">Add Crime Report</Link></MenuItem>
               <MenuItem><Link style={{color:'black'}} to="missingreport">Add Missing Person</Link></MenuItem>
              
               
            </div>
            </Drawer>

            
            </div>
        )
    }
}
function UserAction(props){
    return(
        <div>
        <Button  color="inherit" ><Link style={{color:'white',textDecoration: "none"}} to="/signup">SignUp</Link></Button> /
        <Button  color="inherit" ><Link style={{color:'white',textDecoration: "none"}} to="/login">Login</Link></Button> 
       </div>
    )
}

const mapStateToProps = (state) => {
    return{
        user:state.authReducer.user,
        isLoading:state.authReducer.isLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        logout:()=>{return dispatch(authAction.signOut())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBAR);