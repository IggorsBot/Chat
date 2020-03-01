import React, {Component} from 'react';
import ReactDOM from 'react-dom';


class Login extends Component {
  render() {
    return(
      <div className="login-form">
        <h1>Login</h1>
        <div className="txtb">
          <input type="text" placeholder="Login"/>
          <span data-placeholder="Username"></span>
        </div>
        <div className="txtb">
          <input type="password" placeholder="Password"/>
          <span data-placeholder="Password"></span>
        </div>

        <input type="submit" className="logbtn" value="Login" onClick={()=>{console.log('click')}}/>

        <div className="bottom-text">
          Don't have account? <span className="link" onClick={()=>{this.props.changeAuth()}}>Sign up</span>
        </div>
      </div>
    )
  }
}

export default Login
