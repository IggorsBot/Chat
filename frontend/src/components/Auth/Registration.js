import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios'
import 'babel-polyfill';

class Registration extends Component {

  state = {
    email: "",
    password: "",
    password_confirm: "",
  }

  sendDataRegistration = async () => {
    console.log('registration')
    try {
      let result = await axios.post(`http://localhost:8080/auth/registration`, {
        email: this.state.email,
        password: this.state.password
      })
    } catch (error) {
      console.log("error", error)
    }
  }

  onChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };


  render() {
    const {email, password, password_confirm} = this.state;
    return(
      <div className="login-form">
        <h1>Registration</h1>
        <div className="txtb">
          <input type="text" placeholder="Login" value={email} onChange={this.onChange} name="email"/>
          <span data-placeholder="Username"></span>
        </div>
        <div className="txtb">
          <input type="password" placeholder="Password" value={password} onChange={this.onChange} name="password"/>
          <span data-placeholder="Password"></span>
        </div>
        <div className="txtb">
          <input type="password" placeholder="Password" value={password_confirm} onChange={this.onChange} name="password_confirm"/>
          <span data-placeholder="Password"></span>
        </div>

        <input type="submit" className="logbtn" value="Registration" onClick={this.sendDataRegistration}/>

        <div className="bottom-text">
          Have you an account? <span className="link" onClick={()=>{this.props.changeAuth()}}>Sing in</span>
        </div>
      </div>
    )
  }
}

export default Registration
