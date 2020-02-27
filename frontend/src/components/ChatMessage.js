import React, {Fragment} from 'react'

function ChatMessage (props) {
    const yourMessage =
      <div className="message-row you-message">
        <div className="message-content">
          <div className="message-text">{props.message.body}</div>
          <div className="message-time">{props.message.time}</div>
        </div>
      </div>


    const otherMessage =
    <div className="message-row other-message">
      <div className="message-content">
        <img  src="daryl.png"/>
        <div className="message-text">{props.message.body}</div>
        <div className="message-time">{props.message.time}</div>
      </div>
    </div>

    return (
      <Fragment>
        {props.message.name == "Bob" ? yourMessage: otherMessage}
      </Fragment>
    )
}

export default ChatMessage
