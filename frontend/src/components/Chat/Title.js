import React from 'react'

// Redux store
import {connect} from 'react-redux'
import store from "../../store";


class Title extends React.Component {

  state = {
    email: "",
    name: "",
  }

  componentDidMount(){
    store.subscribe(() => this.setState(state => ({
              email: store.getState().email,
              name: store.getState().name,
        })));
  }

  render() {
    return (
      <div id="chat-title">
        <span>
          {this.state.name == null ? this.state.email : this.state.name}
        </span>
        <div className="dropdown">
          Menu
        </div>
        <div className="dropdown-content">
          <div>
            Test
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
