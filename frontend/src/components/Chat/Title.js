import React from 'react'

// Redux store
import {connect} from 'react-redux'
import store from '../../store'

import UserMenu from './UserMenu'


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
        <UserMenu changeAuth={this.props.changeAuth}/>
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
