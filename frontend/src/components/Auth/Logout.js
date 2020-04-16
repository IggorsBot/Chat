import React from 'react'

// Request data
import axios from 'axios'
import 'babel-polyfill';

import  { Redirect } from 'react-router-dom'


class Logout extends React.Component{

  logout = async () => {
      try {
        let result = await axios(`http://127.0.0.1:8080/api/auth/logout`, {
          method: "get",
          withCredentials: true
        })
        if (result.status == 200){
          this.props.changeAuth()
        }
    } catch (error) {
      console.log("error", error)
    }
  }

  render(){
    return(
      <div onClick={this.logout}>Logout</div>
    )
  }
}

export default Logout
