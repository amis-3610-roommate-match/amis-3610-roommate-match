import React, {useEffect, useState} from "react";
import { Card, CardWrapper } from 'react-swipeable-cards';
import $ from "jquery";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('../img', false, /\.(png|jpe?g|svg)$/));

export default function CardSwipe(props){
  
  const [data, setData] = useState([]);
    
  useEffect(() =>{
      fetch("https://localhost:5001/api/matches/")
      .then(response => response.json())
      .then(data => setData(data));
  }, [])

  const uploadUser=(id)=>{
    console.log("its going");
  //Simple POST request with a JSON body using fetch
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            name: id.name,
            age: id.age,
            img: id.img,
            detail: id.detail,
            swipedRight: id.swipedRight,
            match: id.match})
    };
    fetch('https://localhost:5001/api/matched', requestOptions)
        .then(response => {if (response.ok) {
          toast.success("New Match!");
          return response.json();
        } else {
          toast.error("Something went wrong...");
          throw new Error('Something went wrong ...');
        }})
  }


  const onSwipeRight = (id) => {
    console.log(id);
    id.swipedRight = true;
    if(id.swipedRight === true && id.match === true){
      uploadUser(id);
    }
  }
  const onSwipeLeft =id => {
    console.log(id.id);
    id.swipedRight = false;
  }
  const renderCards =() => {
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
  return(
    <div>
    <CardWrapper>
      {renderCards()}
    </CardWrapper>
    <ToastContainer/>
    </div>
  );
}