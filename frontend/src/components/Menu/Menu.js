
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
        <ChatsButton/>
        <FriendsButton/>
        <FavoritesButton/>
        <ArchivedButton/>
      </div>

    )

  }
}

export default Menu
