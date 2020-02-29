import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Style from 'style-it';

import ConversationList from './ConversationList'
import Chat from './Chat'
import Menu from './Menu'
import ChatForm from './ChatForm'
import ChatTitle from './ChatTitle'
import SearchContainer from './SearchContainer'

import axios from 'axios'
import 'babel-polyfill';

class App extends Component {

  state = {
    chatId: 0,
    messages: [],
  }

  changeChat = (chatId) => {
    this.getMessages(chatId)
  }

  async getMessages (chatId) {
    try {
      // let res = await axios.get(`http://localhost:8080/messages/${this.state.chatId}`)
      let res = await axios.get(`http://localhost:8080/hello/${chatId}`)
      this.setState({ messages: res.data, chatId: chatId})

    } catch (error) {
      console.log("error", error)
    }
  }




  render() {
    return(
      <div id="chat-container">
        <SearchContainer />
        <ConversationList changeChat={this.changeChat}/>
        <Menu />

        <Chat messages={this.state.messages} chatId={this.state.chatId}/>

      </div>
        )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
