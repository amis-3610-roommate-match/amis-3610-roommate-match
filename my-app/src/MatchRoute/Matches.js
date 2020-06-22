import React, {useEffect, useState} from "react";
import { MatchDisplay } from "./MatchDisplay";

export default function Matches(props){
    const [data, setData] = useState([]);
    
    useEffect(() =>{
        fetch("https://roommate-backend.azurewebsites.net/api/matched/"+sessionStorage.getItem("userId"))
        .then(response => response.json())
        .then(data => setData(data));
    }, [])

    debugger;
    var holder = data[0];
    console.log(holder);
    
    return(
        <div className="Books">
            <div className="lander">
                <MatchDisplay users={data}/>
            </div>
        </div>
    );

}