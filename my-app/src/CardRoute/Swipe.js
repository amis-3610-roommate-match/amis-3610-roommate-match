import CardSwipe from "./cardSwipe";
import React, {Component} from "react";
import Yes from "../icon1.png";
import No from "../icon2.png";

export default class Swipe extends Component{
    render(){
        return(
            <div>
                <CardSwipe/>
                <img src= {Yes} className="box Yes stack-top" style={{opacity: 0}}/>
                <img src= {No}className="box No stack-top"style={{opacity: 0}}/>
            </div>
        );
    }
}