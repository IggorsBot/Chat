import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios'
import 'babel-polyfill';

import  { Redirect } from 'react-router-dom'


class Login extends Component {
  state = {
    disabled: true,
    email: "",
    password: "",
  }

  sendDataLogin = async () => {
    try {
      let result = await axios(`http://127.0.0.1:8080/api/auth/login`, {
        method: "post",
        data: {
          email: this.state.email,
          password: this.state.password
        },
        withCredentials: true
      })
      if (result.status == 200){
        this.props.changeAuth()
      }
    } catch (error) {
      console.log("error", error)
    }
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value}, () => {
      if ((this.state.password.length > 0) && (this.state.email.length > 0)){
        this.setState({disabled: false })
      } else {
        this.setState({disabled: true})
      }
    });
  };

  render() {
    const {email, password, password_confirm} = this.state;

    return(
      <div className="login-form">
        <h1>Login</h1>
        <div className="txtb">
          <input type="text" placeholder="Login" value={email} onChange={this.onChange} name="email"/>
          <span data-placeholder="Username"></span>
        </div>
        <div className="txtb">
          <input type="password" placeholder="Password" value={password} onChange={this.onChange} name="password"/>
          <span data-placeholder="Password"></span>
        </div>

        <input type="submit" className={this.state.disabled ? "logbtn-deactivate" : "logbtn"} disabled={this.state.disabled} value="Login" onClick={this.sendDataLogin}/>

        <div className="bottom-text">
          Don't have account? <span className="link" onClick={()=>{this.props.changeFlag()}}>Sign up</span>
        </div>
      </div>
    )
  }
}

export default Login
