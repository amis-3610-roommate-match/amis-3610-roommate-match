import React, {Component} from "react"
import {Card, Button} from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

;
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
        ;
            const ReqOP = {method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: this.state.userName,
              password: this.state.password})
            };
            const response = await fetch('https://localhost:5001/users/authenticate', ReqOP)
            const json = await response.json();
            this.setState({token: json.token});
            localStorage.setItem("token", this.state.token);
            if((this.state.token).length > 0){
                window.location.replace( "http://localhost:3000/");
            }
    }
    

    render(){
        return(
        <div className = "loginBox">
            <label className="Labelname" >User Name</label>
            <input className="form-control barInput"  id="userName" type="text" placeholder="User Name" value={this.state.userName}  onChange={this.inputUser}></input>
            <label className="Labelname" >Password</label>
            <input className="form-control barInput"  id="passWord" type="password" placeholder="password" value={this.state.password}  onChange={this.inputPass}></input>
            <button className=" btn btn-primary sub" onClick={this.handleUser} >Submit changes</button>
        </div>
        );
    }
}