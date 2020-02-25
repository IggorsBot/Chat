
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Style from 'style-it';


import ChatsButton from './ChatsButton'
import FavoritesButton from './FavoritesButton'
import FriendsButton from './FriendsButton'
import ArchivedButton from './ArchivedButton'


class Menu extends Component {
  render() {
    return(
      <Style>
     {`
       .background:hover{
         border-radius: 5px;
         background: #f2f2f2;
       }
     `}

      <div>
         <div className="px-3 py-2 my-3 background" onClick={()=> this.props.switchMenu('Chats')}>
           <img src="http://localhost:800/static/icons/speech-bubble.png" alt="speech-bubble" height="24" width="24" style={{}}/>
         </div>
         <div className="px-3 py-2 my-3 background" onClick={()=> this.props.switchMenu('Friends')}>
           <img src="http://localhost:800/static/icons/user.png" alt="user" height="24" width="24" style={{}}/>
         </div>
         <div className="px-3 py-2 my-3 background" onClick={()=> this.props.switchMenu('Favorites')}>
           <img src="http://localhost:800/static/icons/star.png" alt="star" height="24" width="24" style={{}}/>
         </div>
         <div className="px-3 py-2 my-3 background" onClick={()=> this.props.switchMenu('Archived')}>
           <img src="http://localhost:800/static/icons/folder.png" alt="folder" height="24" width="24" style={{}}/>
         </div>
       </div>
     </Style>


    )

  }
}

export default Menu
