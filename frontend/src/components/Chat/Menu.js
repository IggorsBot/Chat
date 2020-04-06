import React, {Fragment} from 'react'

// Some components
import Title from './Title'
import Message from './Message'
import InputMessage from './InputMessage'

// Redux store
import {connect} from 'react-redux'
import store from "../../store";

// Request data
import axios from 'axios'
import 'babel-polyfill';

class Menu extends React.Component {
  constructor(props){
    super(props);
    this.state = {
     chatId: -1,
     user_id: 0,
     messages: [],
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
    store.subscribe(() => this.setState(state => ({
              user_id: store.getState().user_id,
              messages: this.props.messages
        })));

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
    const message = {contect: messageString, user: 1, chatId: this.state.chatId}
    this.ws.send(JSON.stringify(message))
  }

  render(){
    console.log('messages', this.state.messages)
    return (
      <Fragment>
        <Title />
        <div id="chat-message-list">
        {this.state.messages.map((message, index)=>{
          return (<Message message={message} key={index} user_id={this.state.user_id}/>)
        })}
        </div>
        <InputMessage ws={this.ws} onSubmitMessage={messageString => this.submitMessage(messageString)}/>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};

export default connect(mapStateToProps)(Menu)
