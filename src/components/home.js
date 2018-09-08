import React, {Component} from 'react';
import {connect}  from 'react-redux';
import {Grid, Typography ,Button, Divider, Card ,CardContent, FormControl, InputLabel, Input, Select, MenuItem, CardActions} from '@material-ui/core';
import NavBar from '../container/navBar';
import authAction from '../store/action/authAction';
import {Link} from 'react-router-dom';
import crimeAction from '../store/action/crimeAction';


class Home extends Component{
    constructor(props){
        super(props);

        this.state = {
            Drawer:false,
            city:'',
            report:'',
            reportList:["Crime Report", "Complain Report", "Missing Person"],
            selectedArray:'',
            search:[],
            admin:false,
            user:false,
        }

        console.log('constructor',props.missingList)
    }

    toggleDrawer = open => {
        this.setState({ Drawer: open });
        if(this.props.user){
            console.log()
        }
      };
    
     
    

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
            const userId = this.props.user.uid
            this.props.getMyCrime(userId)
            this.props.getMyComplain(userId)
            this.props.getMissingPersons(userId)
           
        }

        else{
          this.setState({
              user:false
          })
        }
        
    }
      changeHandler = eve =>{

        this.setState({[eve.target.name]: eve.target.value})

        if(eve.target.name === "report" && eve.target.value !== ''){

            if(eve.target.value === "Crime Report"){
                    this.setState({
                        selectedArray: 'crime'
                    })
            }

            else if(eve.target.value === "Complain Report"){
                this.setState({
                    selectedArray: 'complain'
                })
            }

            else if(eve.target.value === "Missing Person"){
                this.setState({
                    selectedArray: 'missing'
                })
            }
           
        }
      
    
        
    }


    reviewHandler = (value) => {
        console.log(value)
        let updateInfo = {
            key:value,
            status:'Reviewd',
            arrayName:this.state.selectedArray
        }

       
        this.props.status(updateInfo)
       
        
    }

    searchHandler = (eve) => {


        const { selectedArray} = this.state;
        let search = {
            array:selectedArray,
            city:''
        }
        
        this.setState({[eve.target.name]: eve.target.value})

        if(eve.target.value !== '' ){
            search.city = eve.target.value
            this.props.searchReport(search)
        }

        
    }

    renderProps(props){
        return(
            <div>
            <Button variant="contained" color="secondary"><Link to="/complains">View Complains {this.props.complainList.length}</Link></Button>
                <Button variant="contained" color="secondary"><Link to="/crimes">View Crimes {this.props.crimeList.length}</Link></Button>
                <Button variant="contained" color="secondary"><Link to="/missingpersons">View Missing Person {this.props.missingList.length}</Link></Button>
            </div>
        )
    }

    render(){

        const user = this.props.user
       
     
        return(
            <div style={{flexGrow: 1}}>
              

                <NavBar openDrawer={this.state.Drawer} toggleDrawer={this.toggleDrawer} />

                <Grid container spacing={16} alignItems="center" direction="column" justify="center" >
                <Grid item xs={12} sm={12} style={{marginTop:20}}>
    
                {user ? this.renderProps() : ''}

                </Grid>

                 <Divider style={{marginTop:20}}/>

             
 
                </Grid>
               
               

            <Grid container spacing={16} direction="row" justify="center">
                
                <Grid item item xs={10} sm={5}>
                <FormControl fullWidth >
                    <InputLabel htmlFor="report">Search By Report</InputLabel>
                    <Select name="report" id="report"
                        value={this.state.report}
                        onChange={this.changeHandler}
                        inputProps={{
                        name: 'report',
                        id: 'report',
                        }}
                    >
                   
                   {
                        this.state.reportList.map(value => {
                        return <MenuItem value={value}>{value}</MenuItem>
                        })
                    
                    }
                        
                       
                    </Select>
                    </FormControl>
                </Grid>


                <Grid item xs={10} sm={5}>
                <FormControl fullWidth>
                    <InputLabel htmlFor="city">Which City</InputLabel>
                    <Select
                        value={this.state.city}
                        onChange={this.searchHandler}
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
                    
                    </Select>
                    </FormControl>
                </Grid>
            </Grid>

            <Grid container spacing={16} direction="row" justify="center">

                      {
                    this.props.searchList.map(value => {
                        return (
                            <Grid item xs={12} sm={4}  style={{marginTop:"20px"}}>
                            <Card key={value.key}>
                    {value.image? <img src={value.image} style={{width:"100%", height:200}} />: ''}
                        <CardContent>
                        <Typography gutterBottom variant="headline" component="h2">
                        {value.title}
                        {value.name? value.name : ''}
                        </Typography>
                        <Typography component="p">
                        {value.description}
                        </Typography>
                        </CardContent>
                        <CardActions>
                        
                        {
                            this.state.admin == false ? '' : <Button  size="small" color="secondary" onClick={()=>this.reviewHandler(value.key)}>{value.status}</Button>
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
        city:state.crimeReducer.city,
        user:state.authReducer.user,
        isLoading:state.authReducer.isLoading,
        
        crimeList:state.crimeReducer.userCrime,
        missingList:state.crimeReducer.userMissing,
        complainList:state.crimeReducer.userComplain,

        searchList:state.crimeReducer.searchList
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        
        logout:()=>{return dispatch(authAction.signOut())},
        searchReport: (payload) => {return dispatch(crimeAction.searchReport(payload))},
        getMyCrime:(userId) => {return dispatch(crimeAction.getUserCrime(userId))},
        getMyComplain:(userId) => {return dispatch(crimeAction.getUserComplain(userId))},
        getMissingPersons:(userId) => {return dispatch(crimeAction.getUserMissing(userId))},
        status: statusUpdate => {return dispatch(crimeAction.updateStatus(statusUpdate))},
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home)