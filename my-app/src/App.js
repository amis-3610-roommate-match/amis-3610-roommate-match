import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import SideBar from './sidebar';
import Routes from "./Routes";
import Match from "./img/match.png";

export default class App extends Component {
  
  render(){
  return (
    <div id="App">
      <body>
        <SideBar />
        <div id="page-wrap">
          <h1>
          <img src={Match} height= "30px"></img>
            Roommate Matcher
          </h1>
          <Routes/>
        </div>
      </body>
      
    </div>
    
  );
  }
}


