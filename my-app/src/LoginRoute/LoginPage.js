import React, {Component} from "react"
import {Card, Button} from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Match from "../img/match.png";
export default class Login extends Component{
    constructor(props){
        super(props);
        this.state ={
            userName: "",
            password: "",
            token:""
        }
        //this.handleUser = this.handleUser.bind(this);
    }

    inputUser = (evt) =>{
        this.setState({userName: evt.target.value});

    }
    inputPass = (evt) =>{
        this.setState({password: evt.target.value});
    }
    handleUser = async ()=>{
            const ReqOP = {method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: this.state.userName,
              password: this.state.password})
            };
            const response = await fetch('https://localhost:5001/users/authenticate', ReqOP)
            const json = await response.json();
            this.setState({token: json.token});
            sessionStorage.setItem("token", this.state.token);
            if((this.state.token).length > 0){
                window.location.replace( "http://localhost:3000/swipe");
            }
    }
    

    render(){
        window.onload= sessionStorage.clear();
        return(
        <div className = "loginBox">
            <img src={Match} height= "100px" id= "logo_box"></img>
            <label className="Labelname" id="userLabel">User Name</label>
            <input className="form-control barInput"  id="userName" type="text" placeholder="User Name" value={this.state.userName}  onChange={this.inputUser}></input>
            <label className="Labelname" id="passLabel">Password</label>
            <input className="form-control barInput"  id="passWord" type="password" placeholder="password" value={this.state.password}  onChange={this.inputPass}></input>
            <button className=" btn btn-primary sub" id="login_button" onClick={this.handleUser} >Login</button>
        </div>
        );
    }
}