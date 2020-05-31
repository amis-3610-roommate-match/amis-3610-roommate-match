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
  const items = [...Array(100)].map((val, i) => `Item ${i}`);

export default class Messages extends Component{
    constructor(props){
        super(props);
        this.state = {
          image : images["all.jpg"],
          name : "Terri Moy",  
          nick: '', 
          message: '',
          messageList:[],
          userid:'' ,
          hubConnection: null
        };
        
    }

   

    componentDidMount =() =>{
        this.setState({userid: (this.props.location.pathname).substring(10)});
        const nick = window.prompt('Your name:', 'John');
        const hubConnection = new signalR.HubConnectionBuilder()
        .withUrl("https://localhost:5001/chatHub", {
            skipNegotiation: true,
            transport: signalR.HttpTransportType.WebSockets
          })
        .configureLogging(signalR.LogLevel.Information)
        .build();
        this.setState({hubConnection, nick}, ()=>{
            this.state.hubConnection
                .start()
                .then(() => console.log('Connection Started!'))
                .catch(err => console.log('Error While est connection :('));
            
            // this.state.hubConnection.on('Send', (nick, receivedMessage) => {
            //     const text = '${nick}: ${receivedMessage}';
            //     const messageList = this.state.messageList.concat([text]);
            //     this.setState({ messageList });
            // });
            this.ReceivedMessage();
        });
    }

    sendMessage = () =>{
        this.state.hubConnection
            .invoke('Send', this.state.nick, this.state.message, sessionStorage.getItem("userId"), this.state.userid)
            .catch(err => console.error(err));
        
        this.state.messageList.push(this.state.message);
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

    render(){
        return(
            <div className="container" id="message_box">
                <div id= "Message_Info">
                    <span> Terri Moy</span>
                </div>
                <div id= "MessageList">
                    <ul id="Messages">
                        {/* {items.map((item, i) => (<li className="otherUser" key={`item_${i}`}>{ item }</li>))}
                        <li className="youUser">hello</li>
                        <li className="otherUser">hello</li> */}
                        {this.state.messageList.map((message, i) => (
                        <li className="youUser" key={i}> {message} </li>
                        ))}
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
