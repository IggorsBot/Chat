import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import ConversationList from './ConversationList'
import Menu from './Menu'
import AddButton from './AddButton'
import InputMessage from './InputMessage'
import Title from './Title'
import Search from './Search'

import axios from 'axios'
import 'babel-polyfill';

class ChatApp extends Component {

  state = {
    chatId: 0,
    messages: [],
  }

  changeChat = (chatId) => {
    this.getMessages(chatId)
  }

  async getMessages (chatId) {
    try {
      let res = await axios.get(`http://localhost:8080/messages/${chatId}`)
      this.setState({ messages: res.data, chatId: chatId})

    } catch (error) {
      console.log("error", error)
    }
  }




  render() {
    return(
      <div id="chat-container">
        <Search />
        <ConversationList changeChat={this.changeChat}/>
        <AddButton />

        <Menu messages={this.state.messages} chatId={this.state.chatId}/>

      </div>
        )
  }
}

export default ChatApp
