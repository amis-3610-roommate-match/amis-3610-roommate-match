import React, {Component} from "react";
import { MatchDisplay } from "./MatchDisplay";

export default class Matches extends Component{
    constructor(props){
        super(props);
        this.state = {
            books:[
                {
                    id: 1,
                    title: "Domain Drive Design",
                    author: "Eric Evans",
                    isbn: "978-0321125217"
                },
                {
                    id:2,
                    title: "Accelerate",
                    author: "Nicole Forsgren",
                    isbn: "978-1942788331"
                },
                {
                    id:3,
                    title: "Accelerate",
                    author: "Nicole Forsgren",
                    isbn: "978-1942788331"
                },
                {
                    id:4,
                    title: "Life",
                    author: "Nicole Forsgren",
                    isbn: "978-1942788331"
                },
                {
                    id:5,
                    title: "Jazz",
                    author: "Nicole Forsgren",
                    isbn: "978-1942788331"
                },
                {
                    id:6,
                    title: "Bass",
                    author: "Nicole Forsgren",
                    isbn: "978-1942788331"
                }

            ]
        };
    }
    render(){
        return(
            <div className="Books">
                <div className="lander">
                    <MatchDisplay books={this.state.books}/>
                </div>
            </div>
        );
    }
}