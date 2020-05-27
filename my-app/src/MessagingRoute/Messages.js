import React, {Component} from "react"
import {Card, Button} from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }
  
  const images = importAll(require.context('../img', false, /\.(png|jpe?g|svg)$/));
  const items = [...Array(100)].map((val, i) => `Item ${i}`);

export default class Messages extends Component{
    constructor(props){
        super(props)
        this.state = {
          image : images["all.jpg"],
          name : "Terri Moy",  
          messageList:[]
        }
        
    }

    render(){
        return(
            <div className="container" id="message_box">
                <div id= "Message_Info">
                    <span> Terri Moy</span>
                </div>
                <div id= "MessageList">
                    <ul>
                        {items.map((item, i) => (<li className="otherUser" key={`item_${i}`}>{ item }</li>))}
                        <li className="youUser">hello</li>
                        <li className="otherUser">hello</li>
                    </ul>
                </div>
                <input className="textarea"  id="text_entryinput" type="text"></input> 
                <button class="btn btn-primary" id= "sendbbtn">
                    send
                </button>
            </div>
        );
    }
}