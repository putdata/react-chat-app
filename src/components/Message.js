import React from 'react';

class Message extends React.Component {
  render() {
    const enter = (
      <div>{this.props.data.user_id} 님이 입장하였습니다.</div>
    )
    const out = (
      <div>{this.props.data.user_id} 님이 퇴장하였습니다.</div>
    )
    if(this.props.data.alert === true) {
      return (
        <div className="message-alert">
          {this.props.data.newUser ? enter : out}
        </div>
      )
    }
    else if(this.props.user_id === this.props.data.user_id) {
      return (
        <div className="message me">
          <div className="message-body">{this.props.data.content}</div>
        </div>
      )
    } else {
      return (
        <div className="message">
          <div>{this.props.data.user_id}</div>
          <div className="message-body">{this.props.data.content}</div>
        </div>
      )
    }
  }
}

export default Message;