import React from 'react'

import Logout from './../Auth/Logout'
import Profile from './ProfileLinks/Profile'


class UserMenu extends React.Component {
  constructor() {
    super();

    this.state = {
      showMenu: false,
    }

    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  showMenu(event) {
    event.preventDefault();

    this.setState({showMenu: true}, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }

  closeMenu() {
    if (!this.dropdownMenu.contains(event.target)) {
      this.setState({ showMenu: false }, () => {
        document.removeEventListener('click', this.closeMenu);
      });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.closeMenu);
  }

  render() {
    return (
      <div className="dropdown">
        <div className="user-menu" onClick={this.showMenu}>
          <img src="http://localhost:800/static/icons/user.png" />
        </div>

        {this.state.showMenu ? (
          <div className="dropdown-content"
               ref={(element) => {
                 this.dropdownMenu = element;
               }}>
            <div className="profile-link">
              <Profile />
            </div>
            <hr/>
            <div className="profile-link">
              <Logout changeAuth={this.props.changeAuth}/>
            </div>
          </div>
        ) : (null)}
      </div>
    )
  }
}

export default UserMenu
