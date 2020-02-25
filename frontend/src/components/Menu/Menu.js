
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import ChatsButton from './ChatsButton'
import FavoritesButton from './FavoritesButton'
import FriendsButton from './FriendsButton'
import ArchivedButton from './ArchivedButton'


class Menu extends Component {


  render() {
    return(
      <div>
        <div className="my-5" onClick={()=> this.props.switchMenu('Chats')}>
          <img src="http://localhost:800/static/icons/speech-bubble.png" alt="speech-bubble" height="24" width="24"/>
        </div>
        <div className="my-5" onClick={()=> this.props.switchMenu('Friends')}>
          <img src="http://localhost:800/static/icons/user.png" alt="user" height="24" width="24"/>
        </div>
        <div className="my-5" onClick={()=> this.props.switchMenu('Favorites')}>
          <img src="http://localhost:800/static/icons/star.png" alt="star" height="24" width="24"/>
        </div>
        <div className="my-5" onClick={()=> this.props.switchMenu('Archived')}>
          <img src="http://localhost:800/static/icons/folder.png" alt="folder" height="24" width="24"/>
        </div>
      </div>

    )

  }
}

export default Menu
