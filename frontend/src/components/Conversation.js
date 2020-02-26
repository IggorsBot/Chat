import React from 'react'

class Conversation extends React.Component {
  render() {
    return (
      <div id="chat-message-list">
        <div className="message-row you-message">
          <div className="message-content">
            <div className="message-text">Ok then</div>
            <div className="message-time">Apr 16</div>
          </div>

        </div>
        <div className="message-row other-message">
          <div className="message-content">
            <img  src="daryl.png"/>
            <div className="message-text">
              Yeah I think it's best we do that. Otherwise things won't
              work well at all. I'm adding more text here to test the
              sizing of the speech bubble and the wrapping of it too.
            </div>
            <div className="message-time">Apr 16</div>
          </div>
        </div>
        <div className="message-row you-message">
          <div className="message-content">
            <div className="message-text">Ok then</div>
            <div className="message-time">Apr 16</div>
          </div>

        </div>
        <div className="message-row other-message">
          <div className="message-content">
            <img  src="daryl.png"/>
            <div className="message-text">
              Yeah I think it's best we do that. Otherwise things won't
              work well at all. I'm adding more text here to test the
              sizing of the speech bubble and the wrapping of it too.
            </div>
            <div className="message-time">Apr 16</div>
          </div>
        </div>
        <div className="message-row you-message">
          <div className="message-content">
            <div className="message-text">Ok then</div>
            <div className="message-time">Apr 16</div>
          </div>

        </div>
        <div className="message-row other-message">
          <div className="message-content">
            <img  src="daryl.png"/>
            <div className="message-text">
              Yeah I think it's best we do that. Otherwise things won't
              work well at all. I'm adding more text here to test the
              sizing of the speech bubble and the wrapping of it too.
            </div>
            <div className="message-time">Apr 16</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Conversation
