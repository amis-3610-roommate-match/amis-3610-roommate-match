import React from "react";
import {Card, Button} from "react-bootstrap";


export function MatchCard(props) {
    return(
        <Card style={{ width: "16em"}}>
            <Card.Img variant="top" src="https://via.placeholder.com/150"/>
            <Card.Body>
                <Card.Title>{props.user.name} &nbsp; {props.user.Age}</Card.Title>
                <Card.Text>Author: {props.user.detail}</Card.Text>
                <Button variant="info">Let's Chat!</Button>
            </Card.Body>
        </Card>
    );
}