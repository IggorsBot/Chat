import React, {Component} from 'react';
import ReactDOM from 'react-dom';


class Login extends Component {
  state = {
    disabled: true,
    email: "",
    password: "",
  }

  sendDataLogin = async () => {
    console.log('click')
    // try {
    //   let result = await axios.post(`http://localhost:8080/auth/login`, {
    //     email: this.state.email,
    //     password: this.state.password
    //   })
    // } catch (error) {
    //   console.log("error", error)
    // }
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
          Don't have account? <span className="link" onClick={()=>{this.props.changeAuth()}}>Sign up</span>
        </div>
      </div>
    )
  }
}

export default Login
