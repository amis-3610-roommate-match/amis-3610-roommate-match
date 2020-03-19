import React from "react";
import {Card, Button} from "react-bootstrap";

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }
  
  const images = importAll(require.context('../img', false, /\.(png|jpe?g|svg)$/));


export function MatchCard(props) {
    return(
        <Card style={{ width: "16em"}}>
            <Card.Img variant="top" src={images[props.user.img]}/>
            <Card.Body>
                <Card.Title>{props.user.name} &nbsp; {props.user.Age}</Card.Title>
                <Card.Text>info: {props.user.detail}</Card.Text>
                <Button variant="info">Let's Find a Place!</Button>
            </Card.Body>
        </Card>
    );
}