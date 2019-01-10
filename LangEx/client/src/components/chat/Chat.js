import React, { Component } from 'react'
import Messages from './Messages'
import Input from './Input'
import jwt_decode from 'jwt-decode';
import { Link }from 'react-router-dom';

function randomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

  if(localStorage.jwtToken){
  const decoded = jwt_decode(localStorage.jwtToken)
  var loggedUser = decoded;
  } else {
    var loggedUser = ''
  }

 
class Chat extends Component {

  state = {
    messages: [],
    member: {
      username: loggedUser.name,
      color: randomColor(),
    }
  }

  constructor() {
    super();
    this.drone = new window.Scaledrone("WxgBXps4Rt5ZwEHc", {
      data: this.state.member
    });
    this.drone.on('open', error => {
      if (error) {
        return console.error(error);
      }
      const member = {...this.state.member};
      member.id = this.drone.clientId;
      this.setState({member});
    });
    const room = this.drone.subscribe("observable-room");
    room.on('data', (data, member) => {
      const messages = this.state.messages;
      messages.push({member, text: data});
      this.setState({messages});
    });
  }


  render() {

    const authorized = (
      <div  className="chat-app">
      <Messages
          messages={this.state.messages}
          currentMember={this.state.member}
        />
        <Input
          onSendMessage={this.onSendMessage}
        />
      </div>  
    );

    const noToken = (
      <div className="chat-fail">
        <h1>You are not logged in. </h1>
        <span>
          <Link to="/register" className="btn btn-lg btn-info mr-2">Sign Up</Link>
          <Link to="/login" className="btn btn-lg btn-light">Login</Link>
        </span>
      </div>
    )

    return (
      <div>
        {localStorage.jwtToken ? authorized : noToken}
      </div>
    );
  }

  onSendMessage = (message) => {
    this.drone.publish({
      room: "observable-room",
      message
    });
  }

}
export default Chat