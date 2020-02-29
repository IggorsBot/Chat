import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import ChatApp from './Chat/ChatApp';
import Auth from './Auth/Auth'

class App extends Component {


  render() {
    return(
      <Auth />
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
