import React, {Fragment} from 'react'

import ChatTitle from './ChatTitle'
import ChatMessage from './ChatMessage'
import ChatForm from './ChatForm'

const URL = 'ws://localhost:8080/ws'


class Chat extends React.Component {

  state = {
   name: 'Bob',
   messages: [
     {body: "Hey man. What's up", time: "Apr 16", name: "Bob"},
     {body: "I'm fine", time: "Apr 16", name: "Frank"},
     {body: "Ok", time: "Apr 16", name: "Bob"}
   ],
 }

 ws = new WebSocket(URL)

  componentDidMount() {
    this.ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log('connected')
    }

    this.ws.onmessage = evt => {
      // on receiving a message, add it to the list of messages
      const message = JSON.parse(evt.data)
      this.addMessage(message)
    }

    this.ws.onclose = () => {
      console.log('disconnected')
      // automatically try to reconnect on connection loss
      this.setState({
        ws: new WebSocket(URL),
      })
    }
  }

  addMessage = message =>
    this.setState(state => ({ messages: [message, ...state.messages] }))

  submitMessage = messageString => {
    // on submitting the ChatInput form, send the message, add it to the list and reset the input
    const message = { name: this.state.name, message: messageString }
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
