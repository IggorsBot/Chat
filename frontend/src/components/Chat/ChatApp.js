import React, {Component} from 'react';
import ReactDOM from 'react-dom';

// Redux store
import store from "../../store";
import {get_user} from '../../actions/user'
import { Provider } from 'react-redux';

// Request data
import axios from 'axios'
import 'babel-polyfill';

// Some components
import ConversationList from './ConversationList'
import Menu from './Menu'
import AddButton from './AddButton'
import InputMessage from './InputMessage'
import Title from './Title'
import Search from './Search'

class ChatApp extends Component {

  state = {
    user: {},
    chatId: 0,
    messages: [],
  }

  componentDidMount () {
    get_user()
  }

  changeChat = (chatId) => {
    this.getMessages(chatId)
  }

  async getMessages (chatId) {
    try {
      let result = await axios(`http://127.0.0.1:8080/messages/${chatId}`, {
        method: "get",
        withCredentials: true
      })
      console.log('result', result.data)
      this.setState({ messages: result.data, chatId: chatId})

    } catch (error) {
      console.log("error", error)
    }
  }

  render() {
    return(
      <div id="chat-container">
        <Provider store={store}>
          <Search />
          <ConversationList changeChat={this.changeChat}/>
          <AddButton />
          <Menu messages={this.state.messages} chatId={this.state.chatId}/>
        </Provider>
      </div>
    )
  }
}

export default ChatApp
