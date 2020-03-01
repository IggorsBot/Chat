import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Login from './Login'
import Registration from './Registration'

class Auth extends Component {

  state = {
    flag: true
  }

  changeAuth = () => {
    this.setState({flag: !this.state.flag})
  }

  render() {
    return(
      <div id="chat-container">
        <div id="menu-container">
        </div>
        <div id="conversation-list">
        </div>
        <div id="new-message-container">
        </div>
        {this.state.flag ? <Login changeAuth={this.changeAuth}/> : <Registration changeAuth={this.changeAuth}/>}
      </div>
    )
  }
}

export default Auth
