import React from "react";
import {Route, Switch, BrowserRouter} from "react-router-dom";
import Swipe from "./CardRoute/Swipe";
import Matches from "./MatchRoute/Matches";
import Profile from "./Profile/profile";

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component = {Swipe}/>
                <Route path="/matches" exact component = {Matches}/>
                <Route path="/profile" exact component = {Profile}/>
            </Switch>
        </BrowserRouter>
    );
}