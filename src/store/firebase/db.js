import firebase from './config';
var fire = firebase.database().ref("/");


export function addCrimes(payload) {
  return new Promise((res, rej) => {
    var ref =  fire
      .child("crime")
      .push(
        {
          userId:payload.userId,
          city: payload.city,
          title:payload.title,
          description:payload.description,
          status:'Not Review'
        },
        () => {
          res({
            key:ref.key,
            userId:payload.userId,
            city: payload.city,
            title:payload.title,
            description:payload.description,
            status:'Not Review'
          });
        });
  })
}

 
 
  export function updateStatus(payload){


   

    return new Promise((res, rej)=>{
      fire.child(payload.arrayName).child(payload.key).update({status:payload.status});
      res({
        key:payload.key,
        status:payload.status,
        arrayName:payload.arrayName
      })
    })

    
  }


  export function addComplain(payload) {


    return new Promise((res, rej) => {
        var ref = fire
        .child("complain")
        .push(
          {
            userId:payload.userId,
            city: payload.city,
            title:payload.title,
            description:payload.description,
            status:'Not Review'
          },
          () => {
            res({
              key:ref.key,
              userId:payload.userId,
              city: payload.city,
              title:payload.title,
              description:payload.description,
              status:'Not Review'
            });
          });
    })
  }

  export function addMissing(payload) {
   
    return new Promise((res, rej) => {


      var ref =  fire
        .child("missing")
        .push(
          {
            userId:payload.userId,
            name: payload.name,
            image:payload.image,
            description:payload.description,
            city:payload.city,
            status:'Not Review'
          },
          () => {
            res({
              key:ref.key,
              name: payload.name,
              image:payload.image,
              city:payload.city,
              description:payload.description,
              status:'Not Review'
            });
          });
    })
  }




export function getCrime(){
  
    return new Promise((res,rej)=>{
        fire.child('crime').once("value",(snapshot)=>{
            res(snapshotToArray(snapshot));
        })
    })
  }

  export function getMissing(){
    return new Promise((res,rej)=>{
        fire.child('missing').once("value",(snapshot)=>{
            res(snapshotToArray(snapshot));
        })
    })
  }

  export function getComplain(){
    return new Promise((res,rej)=>{
        fire.child('complain').once("value",(snapshot)=>{
            res(snapshotToArray(snapshot));
        })
    })
  }

 

  function snapshotToArray(snapshot) {
    var array = [];
  
    snapshot.forEach(function(childSnapshot) {
       
        var item = childSnapshot.val();
        item.key = childSnapshot.key;
  
        array.push(item);
    });
  
    return array;
  };