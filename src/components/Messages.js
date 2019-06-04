import React from 'react';
import Message from './Message';

class Messages extends React.Component {
  componentDidUpdate() {
    const objDiv = document.getElementById('messageList');
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  render() {
    // Loop through all the messages in the state and create a Message component
    const messages = this.props.msg.map((message, i) => {
      return (
        <Message key={i} data={message} user_id={this.props.user_id} />
      )
    });

    return (
      <div className='chat-body' id='messageList'>
        { messages }
      </div>
    );
  }
}

export default Messages;