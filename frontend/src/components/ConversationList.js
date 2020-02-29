import React from 'react'

class ConversationList extends React.Component{
  state = {
    conversations: [
      {title: "Daryl Duckmanton", date: "Apr 16", message: "This is a message"},
      {title: "Kim O'Nell", date: "Apr 16", message: "Very funny"},
      {title: "Daryl Duckmanton", date: "Apr 16", message: "This is a message"},
    ]
  }
  render(){
    return(
      <div id="conversation-list">
      {this.state.conversations.map((conversation, index)=>{
        return (
          <div className="conversation" key={index} onClick={()=>{this.props.changeChat(index)}}>
            <img  src="daryl.png"/>
            <div className="title-text">
              {conversation.title}
            </div>
            <div className="created-date">
              {conversation.date}
            </div>
            <div className="conversation-message">
              {conversation.message}
            </div>
          </div>
        )
      })}
      </div>
    )
  }
}

export default ConversationList
