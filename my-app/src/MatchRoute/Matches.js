import React, {useEffect, useState} from "react";
import { MatchDisplay } from "./MatchDisplay";

export default function Matches(props){
    const [data, setData] = useState([]);
    
    useEffect(() =>{
        fetch("https://localhost:5001/api/matched/")
        .then(response => response.json())
        .then(data => setData(data));
    }, [])
    
    return(
        <div className="Books">
            <div className="lander">
                <MatchDisplay users={data}/>
            </div>
        </div>
    );

}