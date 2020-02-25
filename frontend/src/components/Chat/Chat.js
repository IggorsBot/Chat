import React, {Component} from 'react';

import ChatMenu from './ChatMenu'
import InputMessage from './InputMessage'
import Message from './Message'

class Chat extends Component {
  constructor(props){
    super(props);
    this.state = {
      messages: [
        {name: "Byrom Guittet", message: "I sent you all files. Good luck with =)"},
        {name: "Mirabelle Tow", message: "You are good"},
        {name: "Mirabelle Tow", message: "=) =)"}]
    }
  }
  render(){
    return (
      <div>
        <ChatMenu />
        {this.state.messages.map((message, index) =>
          <Message
            key={index}
            message={message.message}
            name={message.name}/>)}
        <InputMessage />
      </div>
    )
  }

}

export default Chat
