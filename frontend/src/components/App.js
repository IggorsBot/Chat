import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Style from 'style-it';

import ConversationList from './ConversationList'
import Chat from './Chat'
import Menu from './Menu'
import ChatForm from './ChatForm'
import ChatTitle from './ChatTitle'
import SearchContainer from './SearchContainer'

class App extends Component {

  state = {
    chats: true,
    friends: false,
    archived: false,
    favorites: false,
  }

  switchMenu = (title) => {
    switch(title){
      case 'Chats':
        this.setState({
          chats: true,
          friends: false,
          favorites: false,
          archived: false
        });

        break;
      case 'Friends':
        this.setState({
          chats: false,
          friends: true,
          favorites: false,
          archived: false
        });
        break;
      case 'Archived':
        this.setState({
          chats: false,
          friends: false,
          favorites: false,
          archived: true
        });
        break;
      case 'Favorites':
        this.setState({
          chats: false,
          friends: false,
          favorites: true,
          archived: false
        });
        break;
    }
  }


  render() {
    return(
      <div id="chat-container">
        <SearchContainer />
        <ConversationList />
        <Menu />


        <ChatTitle />
        <Chat />
        <ChatForm />

      </div>
        )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
