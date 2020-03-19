import React, {useEffect, useState} from "react";
import { Card, CardWrapper } from 'react-swipeable-cards';
import $ from "jquery";

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
  const onSwipeRight = (id) => {
    console.log(id.id);
    id.swipedRight = true;
    if(id.swipedRight === true && id.match === true){
      alert("New Match");
    }

    console.log(data);

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
            <h1 class="Name_User" align="left">{d.name} &nbsp; {d.Age}</h1>
            <p class= "detail" align="left">{d.detail}</p>
            
            
        </Card>
      );
    });
  }
  return(
    <CardWrapper>
      {renderCards()}
    </CardWrapper>
  );
}