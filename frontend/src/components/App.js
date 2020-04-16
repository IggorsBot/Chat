import React, {Component, Fragment} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom'

import ChatApp from './Chat/ChatApp';
import Auth from './Auth/Auth'
import Cookies from 'js-cookie';


class App extends Component {

  state = {
    isAuth: false,
  }

  changeAuth = () => {
    this.setState(prevState => ({
      isAuth: !prevState.isAuth
    }));
  }

  isAuthenticated = () => (
    <div>
      {this.state.isAuth ? <ChatApp changeAuth={this.changeAuth}/> : <Auth changeAuth={this.changeAuth}/>}
    </div>
  )


  componentDidMount = () => {
    if (Cookies.get('Token')){
      this.setState({isAuth: true})
    } else {
      this.setState({isAuth: false})
    }
  }

  render() {
    return (
      <Fragment>
        <BrowserRouter>
          <Route path="/" component={this.isAuthenticated} exact/>
        </BrowserRouter>
      </Fragment>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
