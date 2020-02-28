import React, {Fragment} from 'react'

import ChatTitle from './ChatTitle'
import ChatMessage from './ChatMessage'
import ChatForm from './ChatForm'

const URL = 'ws://localhost:8080/ws'


class Chat extends React.Component {

  state = {
   name: 'Bob',
   messages: [
     {contect: "Ok", data: "Apr 16", user: "Bob"},
     {contect: "I'm fine", data: "Apr 16", user: "Frank"},
     {contect: "Hey man", data: "Apr 16", user: "Bob"}
   ],
 }

 ws = new WebSocket(URL)

  componentDidMount() {
    this.ws.onopen = () => {
      console.log('connected')
    }

    this.ws.onmessage = evt => {
      const message = JSON.parse(evt.data)
      this.addMessage(message)
    }

    this.ws.onclose = () => {
      console.log('disconnected')
      this.setState({
        ws: new WebSocket(URL),
      })
    }
  }

  addMessage = message =>
    this.setState(state => ({ messages: [ message, ...state.messages]}))

  submitMessage = messageString => {
    const message = { name: this.state.name, body: messageString, time: "Apr 16", recipient: "Frank"}
    this.ws.send(JSON.stringify(messageString))
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
