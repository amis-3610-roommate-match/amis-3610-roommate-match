import React, {Component} from "react";
import { MatchDisplay } from "./MatchDisplay";

export default class Matches extends Component{
    constructor(props){
        super(props);
        this.state = {
            users:[
                {id: 1, name: "Terri Moy", Age: "22", img:"../img/all.jpg", detail: "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.", swipedRight:null, match: true},
                {id: 2, name: "Love Quinn", Age: "22", img:"https://via.placeholder.com/400",detail: "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.",  swipedRight:null, match: null}, 
                {id: 3, name: "Gwen Beck", Age: "22", img:"https://via.placeholder.com/400", detail: "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.",  swipedRight:null, match: null}, 
                {id: 4, name: "James Lang", Age: "22",img:"https://via.placeholder.com/400", detail: "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.",  swipedRight:null, match: null}
            ]
        };
    }
    render(){
        return(
            <div className="Books">
                <div className="lander">
                    <MatchDisplay users={this.state.users}/>
                </div>
            </div>
        );
    }
}