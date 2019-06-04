import React from "react";
import axios from 'axios';
import io from "socket.io-client";

import Messages from './Messages';
import './css/Chat.css';

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user_id: this.props.userID,
      content: '',
      msg: []
    };

    this.bottomMsg = React.createRef();
    this.keepFocusDown = this.keepFocusDown.bind(this);

    this.socket = io({query: {user_id: this.state.user_id}});

    this.socket.on('NEW_USER', function(data) {
      addMessage({"alert": true, "newUser": true, user_id: data});
    })

    this.socket.on('OUT_USER', function(data) {
      addMessage({"alert": true, "newUser": false, user_id: data})
    });

    this.socket.on('RECEIVE_MESSAGE', function(data) {
      addMessage(data);
    });



    const addMessage = data => {
      const tmp = this.state.msg;
      this.setState({msg: [...tmp, {"alert": data.alert, "newUser": data.newUser, "user_id": data.user_id, "content": data.content}]});
    };

    this.sendMessage = ev => {
      ev.preventDefault();
      if(this.state.content !== '') {
        this.socket.emit('SEND_MESSAGE', {
          user_id: this.state.user_id,
          content: this.state.content
        });
      }
      this.setState({content: ''});
    };
  }

  componentDidMount() {
    axios
    .get('/msg')
    .then(res => {
      this.setState({msg: res.data});
    })
  }

  keepFocusDown() {
    this.bottomMsg.current.focus();
  }
  
  render() {
    return (
      <div className="chat-container">
        <div className="chat-header">
          <span>CHAT</span>
        </div>
        <Messages msg={this.state.msg} user_id={this.state.user_id} />
        <div className="chat-footer">
          <input type="text" placeholder="Message" value={this.state.content} onChange={ev => this.setState({content: ev.target.value})}/>
          <br/>
          <button onClick={this.sendMessage} className="btn btn-primary">Send</button>
        </div>
      </div>
    );
  }
}

export default Chat;