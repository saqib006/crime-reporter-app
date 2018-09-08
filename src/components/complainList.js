import React, {Component} from 'react';
import {connect}  from 'react-redux';
import {Grid, Typography ,CardContent, Card, CardActions, Button, Divider} from '@material-ui/core';
import NavBar from '../container/navBar';
import crimeAction from '../store/action/crimeAction';



class ComplainList extends Component{
    constructor(props){
        super(props);

        this.state = {
            Drawer:false,
           // user: this.props.user? this.props.user : null
            admin:false,
            user:false,
           
        }


       
     
        
    }

    componentWillMount(){
        this.props.getComplain()
    }

    toggleDrawer = open => {
        this.setState({ Drawer: open });
      };
    
      reviewHandler = (value) => {

      
          console.log(value)
          let updateInfo = {
              key:value,
              status:'Reviewd',
              arrayName:'complain',
            
          }

    
            this.props.status(updateInfo)
     
          
      }


      componentDidMount(){
          if(this.props.user){
              const adminKey = "YLghvyjq2QVlW3MoFbZ9F6diHGV2"
              if(this.props.user.uid == adminKey){
                this.setState({
                    admin:true
                })
              }
              else if(this.state.admin == false){
                this.setState({
                    user:true
                })
              }
              
             
          }

          else{
            this.setState({
                user:false
            })
          }
          
      }

    render(){

        
       
     
        return(
            <div style={{flexGrow: 1}}>
              

                <NavBar openDrawer={this.state.Drawer} toggleDrawer={this.toggleDrawer} />

                <Grid container spacing={16} alignItems="center" direction="row"  >
                <Grid item xs={12} sm={12} style={{backgroundColor:'black'}}>
                <Typography gutterBottom variant="headline" component="h1" style={{textAlign:'center',margin:20, color:'white'}}>
                <Button variant="contained" color="secondary" style={{float:"left"}} onClick={()=>this.props.history.replace("/")}>Go Back</Button>
                    Complains
                </Typography>
                </Grid>


            <Divider/>
{
    this.props.complainList.map(value => {
       
        return (

            
            <Grid item xs={12} sm={4}  style={{marginTop:"20px"}}>
            <Card key={value.key}>
       
        <CardContent>
        <Typography gutterBottom variant="headline" component="h2">
           {value.title}
        </Typography>
        <Typography component="p">
           {value.description}
        </Typography>

        
        </CardContent>
        <CardActions>
        {
            this.state.admin == false ? '' :  <Button  size="small" color="secondary" onClick={()=>this.reviewHandler(value.key)}>{value.status}</Button>
        }
        
        {
            this.state.user == false ? '' :  <Button  size="small" color="primary" >{value.status}</Button>
        }
         
        
        </CardActions>
    </Card>


</Grid>
        )
    })
}

        
                </Grid>
            </div>
        )
    }

   
}





const mapStateToProps = (state) => {
    return{
        user:state.authReducer.user,
        isLoading:state.authReducer.isLoading,
        complainList:state.crimeReducer.userComplain,
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        status: statusUpdate => {return dispatch(crimeAction.updateStatus(statusUpdate))},
        getComplain: ()=>{return dispatch(crimeAction.getComplain())}
    }
}




export default connect(mapStateToProps, mapDispatchToProps)(ComplainList)