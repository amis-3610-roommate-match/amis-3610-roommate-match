import React, {Component} from "react"
import {Card, Button} from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as signalR from '@aspnet/signalr';

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}


  const images = importAll(require.context('../img', false, /\.(png|jpe?g|svg)$/));

export default class Messages extends Component{
    constructor(props){
        super(props);
        this.state = {
          image : "",
          name : "",  
          nick: '', 
          message: '',
          messageList:[],
          userid:'' ,
          hubConnection: null
        };
        
    }

   

    componentDidMount =() =>{
        debugger;
        this.setState({userid: (this.props.location.pathname).substring(10)});
        const nick = sessionStorage.getItem("userId")
        const hubConnection = new signalR.HubConnectionBuilder()
        .withUrl("https://roommate-backend.azurewebsites.net/chatHub", {
            skipNegotiation: true,
            transport: signalR.HttpTransportType.WebSockets,
          })
        .configureLogging(signalR.LogLevel.Information)
        .build();
        this.setState({hubConnection, nick}, ()=>{
            this.state.hubConnection
                .start()
                .then(() => this.state.hubConnection
                .invoke('MappingNames', this.state.nick, this.state.userid)
                .catch(err => console.error(err)))
                .catch(err => console.log('Error While est connection :('));
        
        
            
            // this.state.hubConnection.on('Send', (nick, receivedMessage) => {
            //     const text = '${nick}: ${receivedMessage}';
            //     const messageList = this.state.messageList.concat([text]);
            //     this.setState({ messageList });
            // });
           
            //this.onconnectionMapping();
            this.RecievedMessageList(sessionStorage.getItem("userId"));
            this.getUserImage();
            this.ReceivedMessage();
            document.getElementById('MessageList').scrollTop = 9999999;
        });
    }
    // componentDidUpdate(){
    //     debugger;
    //     this.onconnectionMapping();
    // }
    sendMessage = () =>{
        var deliverMessage = {
            message:this.state.message,
            userId:sessionStorage.getItem("userId"),
        }
        
        this.state.hubConnection
            .invoke('Send', this.state.nick, deliverMessage, sessionStorage.getItem("userId"), this.state.userid)
            .catch(err => console.error(err));
        this.state.messageList.push({  message: this.state.message, userId:sessionStorage.getItem("userId")});
        this.setState({message: ''});
        
      
    }

    ReceivedMessage = () =>{
        this.state.hubConnection.on("ReceiveMessage", (user, message) => {
            if(user != this.state.nick){
                const encodedMsg = `${message}`;
                const li = document.createElement("li");
                li.className = "otherUser";
                li.textContent = encodedMsg;
                document.getElementById("Messages").appendChild(li);
            }
        });
    }

    RecievedMessageList = (userId1) =>{
        var userId2 = (this.props.location.pathname).substring(10);
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch('https://roommate-backend.azurewebsites.net/api/messages/'+userId1+'/'+userId2, requestOptions)
            .then(response =>  {if (response.ok) {
                return response.json();
            } else {
                throw new Error('Something went wrong ...');
            }})
            .then(data => {if(data[0]== null){
                    this.setState({ messageList: [] })
                }
                else{
                    this.setState({ messageList: data[0].message_array });
                }
            });
    }
            // this.setState({ messageList: [] });
    
    onconnectionMapping = () =>{
        this.state.hubConnection
        .invoke('MappingNames', this.state.nick)
        .catch(err => console.error(err));
    }    
    
    getUserImage = () =>{
        debugger;
        var userId2 = (this.props.location.pathname).substring(10);
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch('https://roommate-backend.azurewebsites.net/api/matched/user/'+userId2, requestOptions)
            .then(response =>  {if (response.ok) {
                return response.json();
            } else {
                throw new Error('Something went wrong ...');
            }})
            .then(data => {if(data!= null){
                debugger;
                    this.setState({ image: images[data.img] });
                    this.setState({ name: data.name })
                    console.log(this.state.image);
                }
                else{
                    this.setState({ image: "" });
                }
            });
    }

    render(){
        return(
            <div className="container" id="message_box">
                <div id= "Message_Info">
                    <img className="userPic" src={this.state.image}></img>
                    <span> {this.state.name}</span>
                </div>
                <div id= "MessageList">
                    <ul id="Messages">
                        {this.state.messageList.map((message, i) => {if(message.userId == sessionStorage.getItem("userId")){ 
                        return <li className="youUser" key={i}> {message.message} </li>
                        }
                        else{
                            return <li className="otherUser" key={i}> {message.message} </li>
                        }
                        })}
                    </ul>
                </div>
                <input className="textarea"  id="text_entryinput" type="text"
        value={this.state.message}
        onChange={e => this.setState({ message: e.target.value })}></input> 
                <button class="btn btn-primary" id= "sendbbtn" onClick= {this.sendMessage}>
                    send
                </button>
            </div>
        );
    }
}
