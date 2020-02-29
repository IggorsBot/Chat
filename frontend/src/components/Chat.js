import React, {Fragment} from 'react'

import ChatTitle from './ChatTitle'
import ChatMessage from './ChatMessage'
import ChatForm from './ChatForm'
import axios from 'axios'
import 'babel-polyfill';

class Chat extends React.Component {
  constructor(props){
    super(props);
    this.state = {
     chatId: -1,
     name: 'Bob',
     messages: [
       {contect: "Ok", data: "Apr 16", user: "Bob"},
       {contect: "I'm fine", data: "Apr 16", user: "Frank"},
       {contect: "Hey man", data: "Apr 16", user: "Bob"}
     ],
   }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
   return {
    messages: nextProps.messages,
    chatId: nextProps.chatId
   };
  }


  ws = new WebSocket(`ws://localhost:8080/ws`)

  componentDidMount() {

    this.setState(state => ({
      messages: this.props.messages
    }))

    this.ws.onopen = () => {
      console.log('connected')
    }

    this.ws.onmessage = evt => {
      const message = JSON.parse(evt.data)
      this.addMessage(message)
    }

    this.ws.onclose = () => {
      console.log('disconnected')
    }
  }


  addMessage = message =>
    this.setState(state => ({ messages: [ message, ...state.messages]}))

  submitMessage = messageString => {
    const message = {contect: messageString, user: "goga", date: "2020-02-28 17:28:09.508931", chatId: this.state.chatId}
    this.ws.send(JSON.stringify(message))
    this.addMessage(message)
  }

  render(){
    return (
      <Fragment>
        <ChatTitle />
        <div id="chat-message-list">

        {this.state.messages.map((message, index)=>{
          return (
            <ChatMessage message={message} key={index}/>
          )
        })}
        </div>
        <ChatForm ws={this.ws} onSubmitMessage={messageString => this.submitMessage(messageString)}/>
      </Fragment>
    )
  }
}

export default Chat
