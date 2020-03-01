import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import ChatApp from './Chat/ChatApp';
import Auth from './Auth/Auth'

class App extends Component {
  state = {
    isLoading: false,
  }

  changeLoading = () => {
    this.setState({isLoading: true})
  }

  render() {
    const {isLoading} = this.state;
    return (
      <div>
      {isLoading ? <ChatApp /> : <Auth changeLoading={this.changeLoading}/>}
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
