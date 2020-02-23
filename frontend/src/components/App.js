import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Menu from './Menu/Menu'
import Chats from './Chats/Chats'
import Friends from './Friends'
import Archived from './Archived'
import Favorites from './Favorites'

import Chat from './Chat'



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
