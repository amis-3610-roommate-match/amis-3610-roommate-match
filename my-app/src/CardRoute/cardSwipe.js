import React, {useEffect, useState} from "react";
import { Card, CardWrapper } from 'react-swipeable-cards';
import $ from "jquery";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { usePosition } from 'use-position';

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const linkStyle = {
 border: "1px solid",
 color: "#fff",
 background: "black",
 padding: "5px"
}; 

const images = importAll(require.context('../img', false, /\.(png|jpe?g|svg|gif)$/));

class NewMessageNotification extends React.Component {
  
  displayMessage = () => {
    //remove all notifications
    toast.dismiss();

    //navigate to the link. I'll use location hash but it can be done with any router solution
    window.location.replace( this.props.link);
  }

  render(){
    return (
      <div>
        New Match! <a style={linkStyle} onClick={this.displayMessage}>View Matches</a>
      </div>
    );
  }
}

export default function CardSwipe(props){
  debugger;
  const { latitude, longitude, timestamp, accuracy, error }= usePosition(true);
  const [data, setData] = useState([]);

  const findDistance=(data, latitude, longitude)=>{
    var distances = [];
    for(var i = 0; i < data.length; i++){
      var matchLat = Number((data[i].location).substring(0,(data[i].location).indexOf(" "))); 
      var matchLong = Number((data[i].location).substring((data[i].location).indexOf(" "), (data[i].location).length)); 
      var calcDist = Math.sqrt((Math.abs(matchLat-latitude))^2+(Math.abs(matchLong-longitude))^2);
      //calcDist = Math.random(calcDist);
      distances.push(calcDist);
    }
    for(var i = 0; i < data.length; i++){
      if(distances[i] > 5){
        data.splice(i, 1);

      }
    }
    if(latitude != null && longitude != null){
      return true;
    }
  }
  useEffect(()=>{
     fetch("https://localhost:5001/api/matches/"+sessionStorage.getItem("userId"), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer "+sessionStorage.getItem("token")
      }
    })
      .then(response =>  {if (response.ok) {
        return response.json();
      } else {
        throw new Error('Something went wrong ...');
      }})
      .then(data => setData(data));
      
  }, []);
  console.log(data);
  if(data != null && latitude != null && longitude != null){
    findDistance(data, latitude, longitude);
  }

  
  
  
  const sendToMatch=()=>{
    window.location.href = "https://roommatematcher.azurewebsites.net/matches";
  }

  // const options ={
  //   onClick: //this.sendToMatch.bind()
  // }

  const uploadUser=async (id)=>{
    debugger;
    console.log("its going");
  //Simple POST request with a JSON body using fetch
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            id: id.id,
            name: id.name,
            age: id.age,
            img: id.img,
            detail: id.detail,
            location: "40.152015899999995 -83.2268893",
            howFar: 10})
    };
    await fetch('https://localhost:5001/api/matched/'+sessionStorage.getItem("userId")+"/"+id.id, requestOptions)
        .then(response => {if (response.ok) {
          console.log(response)
          toast.success(<NewMessageNotification link="matches"/>);
          return response.json();
        } })
    
  }

  const uploadYourself=(id, matchee)=>{
    debugger;
    console.log("its going");
  //Simple POST request with a JSON body using fetch
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            id: id.id,
            name: id.name,
            age: id.age,
            img: id.img,
            detail: id.detail,
            location: "40.152015899999995 -83.2268893",
            howFar: 10})
    };
    fetch('https://localhost:5001/api/matched/'+matchee, requestOptions)
        .then(response => {if (response.ok) {
          return response.json();
        } else {
          toast.error("Something went wrong...");
          throw new Error('Something went wrong ...');
        }})
  }

  const uploadLike=(id)=>{
    debugger;
    console.log("its going");
  //Simple POST request with a JSON body using fetch
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            id: id.id,
            name: id.name,
            age: id.age,
            img: id.img,
            detail: id.detail,
            location: "40.152015899999995 -83.2268893",
            howFar: 10})
    };
    fetch('https://localhost:5001/api/matches/likes/'+sessionStorage.getItem("userId"), requestOptions)
        .then(response => {if (response.ok) {
          // toast.success(<NewMessageNotification link="matches"/>);
          // console.log(response);
          return response.json();
        } else {
          toast.error("Something went wrong...");
          throw new Error('Something went wrong ...');
        }})
  }

  const uploadSwipe=(id)=>{
    debugger;
    console.log("its going");
  //Simple POST request with a JSON body using fetch
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            id: id.id,
            name: id.name,
            age: id.age,
            img: id.img,
            detail: id.detail,
            location: "40.152015899999995 -83.2268893",
            howFar: 10})
    };
    fetch('https://localhost:5001/api/matches/swipe/'+sessionStorage.getItem("userId"), requestOptions)
        .then(response => {if (response.ok) {
          // toast.success(<NewMessageNotification link="matches"/>);
          // console.log(response);
          return response.json();
        } else {
          toast.error("Something went wrong...");
          throw new Error('Something went wrong ...');
        }})
  }

  const onSwipeRight = (id) => {
    debugger;
    uploadLike(id);
    uploadSwipe(id);
    uploadUser(id);
    
    // console.log(id);
    // if((id.likes).length == 0){
    //   uploadLike(id);
    //   uploadSwipe(id);
    // }
    // else{
    //   for(var i = 0; i < (id.likes).length; i++){
    //     if(((id.likes)[i]).id == sessionStorage.getItem("userId")){
    //       uploadLike(id);
    //       uploadSwipe(id);
    //       uploadUser(id);
    //       var yourself = {
    //         id: sessionStorage.getItem("userId"),
    //         name: sessionStorage.getItem("First Name")+" "+sessionStorage.getItem("Last Name"),
    //         age: sessionStorage.getItem("Age"),
    //         img: sessionStorage.getItem("img"),
    //         detail: sessionStorage.getItem("detail"),
    //         location: "40.152015899999995 -83.2268893",
    //         howFar: 10
    //       };
    //       uploadYourself(yourself, id.id);
    //     }
    //     else{
    //       uploadLike(id);
    //       uploadSwipe(id);
    //     }
    //   }
    // }     
    // id.swipedRight = true;
    // if(id.swipedRight === true && id.match === true){
    // uploadUser(id);
    // }
  }
  const onSwipeLeft =id => {
    console.log(id.id);
    uploadSwipe(id);
    // id.swipedRight = false;
  }
  const renderCards =() => {
    
    if(data == null || (latitude == null && longitude == null)){
      return(
        <img src={images["loader.gif"]}></img>
      )
    }
    console.log(images);
    if(latitude != null && longitude != null){
    return data.map((d) => {
      return(
        <Card
          key={d.id}
          onSwipeRight={onSwipeRight.bind(d.id)}
          onSwipeLeft={onSwipeLeft.bind(d.id)}
          data={d}>
            <img class="imgcard" src={images[d.img]} draggable="false"/>
            <br></br>
            <h1 class="Name_User" align="left">{d.name} &nbsp; {d.age}</h1>
            <p class= "detail" align="left">{d.detail}</p>
        </Card>
      );
    });
  }
  }
  return(
    <div>
    <CardWrapper>
      {renderCards()}
    </CardWrapper>
    <ToastContainer/>
    </div>
  );
}