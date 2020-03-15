import React, { Component } from "react";
import { Card, CardWrapper } from 'react-swipeable-cards';

export default class CardSwipe extends Component{
  constructor(props){
    super(props);
    this.onSwipeRight = this.onSwipeRight.bind(this);
    this.state ={
      data : [
        {id: 1, name: "First", img:"https://via.placeholder.com/400", detail: "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.", swipedRight:null, match: true},
        {id: 2, name: "Second", img:"https://via.placeholder.com/400",detail: "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.",  swipedRight:null, match: null}, 
        {id: 3, name: "third", img:"https://via.placeholder.com/400", detail: "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.",  swipedRight:null, match: null}, 
        {id: 4, name: "fourth", img:"https://via.placeholder.com/400", detail: "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.",  swipedRight:null, match: null}]
    };
  }
  onSwipeRight(id) {
    console.log(id.id);
    id.swipedRight = true;
    if(id.swipedRight === true && id.match === true){
      alert("its a match");
    }
    console.log(this.state.data);

  }
  onSwipeLeft(id) {
    console.log(id.id);
    id.swipedRight = false;
  }
  renderCards() {
    return this.state.data.map((d) => {
      return(
        <Card
          key={d.id}
          onSwipeRight={this.onSwipeRight.bind(d.id)}
          onSwipeLeft={this.onSwipeLeft.bind(d.id)}
          data={d}>
            <img class="imgcard" src={d.img}/>
            <br></br>
            <h1 class="Name_User" align="left">{d.name}</h1>
            <p class= "detail" align="left">{d.detail}</p>
            
            
        </Card>
      );
    });
  }
  render(){
    return(
      <CardWrapper>
        {this.renderCards()}
      </CardWrapper>
    );
  }
}