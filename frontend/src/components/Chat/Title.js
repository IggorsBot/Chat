import React from 'react'

// Redux store
import {connect} from 'react-redux'
import store from '../../store'

import Logout from './../Auth/Logout'
import Profile from './ProfileLinks/Profile'


class Title extends React.Component {
  _isMounted = false;


  state = {
    email: "",
    name: "",
  }

  getUserDataFromStore = () => {
    this.setState(state => ({
      email: store.getState().email,
      name: store.getState().name,
    }));
  }
  componentDidMount() {
    this._isMounted = true;

    store.subscribe(() => {
      if (this._isMounted) {
        this.getUserDataFromStore()
      }
    })
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div id="chat-title">
        <span>
          {this.state.name == null ? this.state.email : this.state.name}
        </span>
        <div className="dropdown">
          Menu
          <div className="dropdown-content">
            <div className="profile-link">
              <Profile />
            </div>
            <div className="profile-link">
              <Logout changeAuth={this.props.changeAuth}/>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};

export default connect(mapStateToProps)(Title)
