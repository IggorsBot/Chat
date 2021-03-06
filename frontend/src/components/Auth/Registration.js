import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios'
import 'babel-polyfill';


class Registration extends Component {

  state = {
    disabled: true,
    email: "",
    password: "",
    password_confirm: "",
  }

  sendDataRegistration = async () => {
    try {
      let result = await axios(`http://127.0.0.1:8080/api/auth/registration`, {
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
          if (
            (
              (this.state.email.length > 0) &&
              (this.state.password.length > 0) &&
              (this.state.password_confirm.length > 0)
            ) &&
              (this.state.password === this.state.password_confirm)
            ){
            this.setState({disabled: false})
          } else {
            this.setState({disabled: true})
          }
        });
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

        <input type="submit" className={this.state.disabled ? "logbtn-deactivate" : "logbtn"} disabled={this.state.disabled}  value="Registration" onClick={this.sendDataRegistration}/>

        <div className="bottom-text">
          Have you an account? <span className="link" onClick={()=>{this.props.changeFlag()}}>Sing in</span>
        </div>
      </div>
    )
  }
}

export default Registration
