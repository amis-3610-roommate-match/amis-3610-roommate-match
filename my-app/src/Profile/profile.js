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
          bio:sessionStorage.getItem("detail"),
          response:[]
        }
        this.handleChange = this.handleChange.bind(this);
        this.uploadUser = this.uploadUser.bind(this);
      }
      handleChange(event) {
        debugger;
        var imageReader = new FileReader();
        imageReader.readAsDataURL(event.target.files[0]);
        console.log(imageReader.result);
        console.log(this.state.file);
        this.setState({
          file: URL.createObjectURL(event.target.files[0])
        })
        console.log("hello");
      }
      handleBio= evt=>{
        this.setState({bio: evt.target.value});
      }
      canSubmit(){
          const {bio} = this.state;
          return bio.length > 0; 
      }
      uploadUser= () =>{
          debugger;
          console.log("its going");
          
          
          
        //Simple POST request with a JSON body using fetch
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                name: document.getElementById("FirstName").value+" "+document.getElementById("LastName").value,
                age: document.getElementById("Age").value,
                img: "all.jpg",
                detail: document.getElementById("exampleFormControlTextarea1").value,
                swipedRight: false,
                match: true,
                location: "40.152015899999995 -83.2268893",
                howFar: Number(document.getElementById("distanceSelect").value)})
        };
        fetch('https://roommate-backend.azurewebsites.net/api/matches/'+sessionStorage.getItem("userId"), requestOptions)
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
                    <input className="form-control barInput"  id="FirstName" type="text" value={sessionStorage.getItem("First Name")}></input>
                    <br></br>
                    <label className="Labelname" >Last Name</label>
                    <input className="form-control barInput" type="text" id="LastName" value={sessionStorage.getItem("Last Name")}></input>
                    <br></br>
                    <label className="Labelname" >Age</label>
                    <input className="form-control barInput" type="text" id="Age" value={sessionStorage.getItem("Age")}></input>
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
                    <textarea className="form-control barInput" id="exampleFormControlTextarea1" rows="4" value={this.state.bio}  onChange={this.handleBio} placeholder=""></textarea>
                    <br></br>
                    <div className="form-group">
                        <label className="Labelname"  >Select Distance:</label>
                        <select className="form-control barInput" id="distanceSelect">
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