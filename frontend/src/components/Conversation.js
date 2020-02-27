import React from 'react'

class Conversation extends React.Component {
  state = {
    otherMessage: [
      {message: "Yeah I think it's best we do that. Otherwise things work well at all", time: "Apr 16"},
      {message: "Yeah I think it's best we do that. Otherwise things work well at all", time: "Apr 16"},
      {message: "Yeah I think it's best we do that. Otherwise things work well at all", time: "Apr 16"},
    ],
    youMessage: [
      {message: "Ok then", time: "Apr 16"},
      {message: "Ok then", time: "Apr 16"},
      {message: "Ok then", time: "Apr 16"},
    ],
  }
  render() {
    return (
      <div id="chat-message-list">
        <div className="message-row you-message">
          <div className="message-content">
            <div className="message-text">{this.state.youMessage[0].message}</div>
            <div className="message-time">{this.state.youMessage[0].time}</div>
          </div>

        </div>
        <div className="message-row other-message">
          <div className="message-content">
            <img  src="daryl.png"/>
            <div className="message-text">{this.state.otherMessage[0].message}</div>
            <div className="message-time">{this.state.otherMessage[0].time}</div>
          </div>
        </div>

      </div>
    )
  }
}

export default Conversation
