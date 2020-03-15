import React from "react";
import { MatchCard } from "./MatchCard";
import { CardColumns } from "react-bootstrap";

export function MatchDisplay(props){
    return(
        <div className= "display">
            <CardColumns style={{margin:"2.5%"}}>
                {props.books.map(b => (
                    <MatchCard book = {b} key={b.id}/>
                ))}
            </CardColumns>
        </div>
    );
}