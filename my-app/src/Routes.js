import React from "react";
import {Route, Switch, BrowserRouter} from "react-router-dom";
import CardSwipe from "./card";
import Matches from "./MatchRoute/Matches";

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component = {CardSwipe}/>
                <Route path="/matches" exact component = {Matches}/>
            </Switch>
        </BrowserRouter>
    );
}