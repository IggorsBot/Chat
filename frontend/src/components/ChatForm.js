import React from 'react'

class ChatForm extends React.Component{
  render() {
    return (
      <div id="chat-form">
        <img src="attachment-logo.svg"/>
        <input type="text" placeholder="type a message."/>
      </div>
    )
  }
}

export default ChatForm
