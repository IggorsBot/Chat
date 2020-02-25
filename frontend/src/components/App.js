import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Menu from './Menu/Menu'
import Chats from './MenuChats/MenuChats'
import Friends from './MenuFriends/MenuFriends'
import Archived from './MenuArchived/MenuArchived'
import Favorites from './MenuFavorites/MenuFavorites'

import Chat from './Chat/Chat'



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
      <div className="d-flex bd-highlig">
        <div className="py-2 bd-highlight px-4 border-right">
          <Menu switchMenu={this.switchMenu}/>
        </div>

        <div className="p-2 bd-highlight flex-grow-1">
          <div className="row">

            <div className="col-3  border-right">
              {this.state.chats && <Chats/>}
              {this.state.friends && <Friends/>}
              {this.state.archived && <Archived/>}
              {this.state.favorites && <Favorites/>}
            </div>

            <div className="col-9">
              <Chat />
            </div>

          </div>
        </div>

      </div>
    )

  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
