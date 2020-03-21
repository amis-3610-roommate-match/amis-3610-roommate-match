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

export default class Profile extends Component{
    constructor(props){
        super(props)
        this.state = {
          file: images["all.jpg"],
          bio:"",
          response:[]
        }
        this.handleChange = this.handleChange.bind(this);
        this.uploadUser = this.uploadUser.bind(this);
      }
      handleChange(event) {
        this.setState({
          file: URL.createObjectURL(event.target.files[0])
        })
        console.log("hello");
      }
      handleSubmit = (evt) => {
        if (!this.canBeSubmitted()) {
          evt.preventDefault();
          return;
        }
        // actual submit logic...
      };
      handleBio= evt=>{
        this.setState({bio: evt.target.value});
      }
      canSubmit(){
          const {bio} = this.state;
          return bio.length > 0; 
      }
      uploadUser= () =>{
          console.log("its going");
          
        //Simple POST request with a JSON body using fetch
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                name: document.getElementById("FirstName").value+" "+document.getElementById("LastName").value,
                age: "22",
                img: "all.jpg",
                detail: document.getElementById("exampleFormControlTextarea1").value,
                swipedRight: false,
                match: true})
        };
        fetch('https://localhost:5001/api/matches', requestOptions)
            .then(response =>  {if (response.ok) {
                toast.success("Saved profile!");
                return response.json();
              } else {
                toast.error("Could not save profile");
                throw new Error('Something went wrong ...');
              }})
            .then(data => this.setState({ postId: data.id }));
            console.log(this.state.data);
      }
      render() {
          const isEnabled = this.canSubmit();
        return (
            
                <div className= "userCreate">
                    <img className= "UploadPreview" src={this.state.file}/>
                    <br></br>
                    <br></br>
                    <div className="custom-file">
                        <label className="custom-file-label" >Upload Image</label>
                        <input type="file" className="custom-file-input" id="inputGroupFile01" onChange={this.handleChange}/>
                    </div>
                    <br></br>
                    <br></br>
                    <label className="Labelname" >First Name</label>
                    <input className="form-control barInput"  id="FirstName" type="text" placeholder="First Name"></input>
                    <br></br>
                    <label className="Labelname" >Last Name</label>
                    <input className="form-control barInput" type="text" id="LastName" placeholder="Last Name"></input>
                    <br></br>
                    <label className="Labelname" >Age</label>
                    <input className="form-control barInput" type="text" id="Age" placeholder="Age"></input>
                    <br></br>
                    <div className="form-group">
                        <label className="Labelname"  >Select Gender:</label>
                        <select className="form-control barInput" id="Sex">
                            <option>M</option>
                            <option>F</option>
                            <option>O</option>
                        </select>
                    </div>
                    <br></br>
                    <label className="Labelname" >Bio</label>
                    <textarea className="form-control barInput" id="exampleFormControlTextarea1" rows="4" value={this.state.bio}  onChange={this.handleBio} placeholder="Bio, details about yourself"></textarea>
                    <br></br>
                    <div className="form-group">
                        <label className="Labelname"  >Select Distance:</label>
                        <select className="form-control barInput" id="sel1">
                            <option>1</option>
                            <option>10</option>
                            <option>20</option>
                            <option>30</option>
                            <option>40</option>
                            <option>50</option>
                        </select>
                    </div>
                    <button className=" btn btn-primary sub" disabled={!isEnabled} onClick={this.uploadUser}>Submit changes</button>
                    <ToastContainer />
                </div>
           
        );
      }
    }