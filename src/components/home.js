import React, {Component} from 'react';
import {connect}  from 'react-redux';
import {Grid, Typography ,Button, Divider, Card ,CardContent} from '@material-ui/core';
import NavBar from '../container/navBar';
import authAction from '../store/action/authAction';
import {Link} from 'react-router-dom';
import crimeAction from '../store/action/crimeAction';


class Home extends Component{
    constructor(props){
        super(props);

        this.state = {
            Drawer:false,
        }

        console.log(props)
    }

    toggleDrawer = open => {
        this.setState({ Drawer: open });
        if(this.props.user){
            console.log()
        }
      };
    
      componentWillMount(){
          this.props.getCrime()
          this.props.getComplain()
          this.props.getMissing()
      }
    


    render(){

        
       
     
        return(
            <div style={{flexGrow: 1}}>
              

                <NavBar openDrawer={this.state.Drawer} toggleDrawer={this.toggleDrawer} />

                <Grid container spacing={16} alignItems="center" direction="column" justify="center" >
                <Grid item xs={12} sm={12} style={{marginTop:20}}>
    
                <Button variant="contained" color="secondary"><Link to="/complains">View Complains</Link></Button>
                <Button variant="contained" color="secondary"><Link to="/crimes">View Crimes</Link></Button>
                <Button variant="contained" color="secondary"><Link to="/missingpersons">View Missing Person</Link></Button>
                </Grid>

                 <Divider style={{marginTop:20}}/>

             
 
                </Grid>
               
                <Grid container spacing={16} justify="center" >
                  <Grid item xs={12} sm={8} style={{marginTop:20}} >
                <Card>
                <CardContent>
                <Typography style={{float:'left'}} gutterBottom variant="headline" component="h2">
                    Complain Report
                </Typography>
                <Typography style={{float:'right'}} gutterBottom variant="headline" component="h2">
                    {this.props.complainList.length}
                </Typography>
                </CardContent>
                    </Card>

                    <Card>
                <CardContent>
                <Typography style={{float:'left'}} gutterBottom variant="headline" component="h2">
                    Crime Report
                </Typography>
                <Typography style={{float:'right'}} gutterBottom variant="headline" component="h2">
                {this.props.crimeList.length}
                </Typography>
                </CardContent>
                    </Card>

                    <Card>
                <CardContent>
                <Typography style={{float:'left'}} gutterBottom variant="headline" component="h2">
                    Missing Person
                </Typography>
                <Typography style={{float:'right'}} gutterBottom variant="headline" component="h2">
                {this.props.missingList.length}
                </Typography>
                </CardContent>
                    </Card>
                </Grid>
                </Grid>


            </div>
        )
    }

   
}





const mapStateToProps = (state) => {
    return{
        user:state.authReducer.user,
        isLoading:state.authReducer.isLoading,
        crimeList:state.crimeReducer.crimeList,
        missingList:state.crimeReducer.missingList,
        complainList:state.crimeReducer.complainList
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        logout:()=>{return dispatch(authAction.signOut())},
        getCrime: ()=>{return dispatch(crimeAction.getCrime())},
        getMissing: ()=>{return dispatch(crimeAction.getMissing())},
        getComplain: ()=>{return dispatch(crimeAction.getComplain())}
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home)