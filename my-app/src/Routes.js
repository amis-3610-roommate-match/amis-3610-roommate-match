import React from "react";
import {Route, Switch, BrowserRouter} from "react-router-dom";
import Swipe from "./CardRoute/Swipe";
import Matches from "./MatchRoute/Matches";
import Profile from "./Profile/profile";
import Login from "./LoginRoute/LoginPage";
import Messages from "./MessagingRoute/Messages";

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component = {Login}/>
                <Route path="/matches" exact component = {Matches}/>
                <Route path="/profile" exact component = {Profile}/>
                <Route path="/swipe" exact component = {Swipe}/>
                <Route path="/messages" exact component = {Messages}/>
            </Switch>
        </BrowserRouter>
    );
}