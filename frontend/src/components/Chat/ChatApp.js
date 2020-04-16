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
import Search from './Search'

class ChatApp extends Component {

  state = {
    user: {},
    chat_id: 0,
    messages: [],
  }

  componentDidMount () {
    get_user()
  }

  changeChat = (chat_id) => {
    this.getMessages(chat_id)
  }

  async getMessages (chat_id) {
    try {
      let result = await axios(`http://127.0.0.1:8080/messages/${chat_id}`, {
        method: "get",
        withCredentials: true
      })
      this.setState({ messages: result.data, chat_id: chat_id})

    } catch (error) {
      console.log("error", error)
    }
  }

  addMessage = message => {
    this.setState({messages: [...this.state.messages, JSON.parse(message)]})
  }

  render() {
    return(
      <div id="chat-container">
        <Provider store={store}>
          <Search />
          <ConversationList changeChat={this.changeChat}/>
          <AddButton />
          <Menu messages={this.state.messages}
                chat_id={this.state.chat_id}
                addMessage={this.addMessage}
                changeAuth={this.props.changeAuth}/>
        </Provider>
      </div>
    )
  }
}

export default ChatApp
