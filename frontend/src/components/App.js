import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Menu from './Menu/Menu'
import Chats from './MenuChats/MenuChats'
import Friends from './MenuFriends/MenuFriends'
import Archived from './MenuArchived/MenuArchived'
import Favorites from './MenuFavorites/MenuFavorites'

import Chat from './Chat/Chat'



class App extends Component {
  render() {
    return(
      <div className="d-flex bd-highlig">
        <div className="p-2 bd-highlight px-5 border-right">
          <Menu />
        </div>

        <div className="p-2 bd-highlight flex-grow-1">
          <div className="row">

            <div className="col-3  border-right">
              <Friends />
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
