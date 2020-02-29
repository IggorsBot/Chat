import React, {Component} from 'react';
import ReactDOM from 'react-dom';


class Registration extends Component {
  render() {
    return(
      <div id="chat-container">
        <div id="menu-container">
        </div>
        <div id="conversation-list">
          <button>Login</button>
          <button>Registration</button>

        </div>
        <div id="new-message-container">
        </div>
        <div id="chat-message-list">
          <input/>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Registration/>, document.getElementById('app'));
