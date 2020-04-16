import React from 'react'
import axios from 'axios'


class ConversationList extends React.Component{
  state = {
    conversations: []
  }

  componentDidMount(){
    this.getConversations()
  }

  getConversations = async () => {
      try {
        let result = await axios(`http://127.0.0.1:8080/api/chat/conversations`, {
          method: "get",
          withCredentials: true
        })
        this.setState({conversations: result.data})
    } catch (error) {
      console.log("error", error)
    }
  }

  render() {
    return(
      <div id="conversation-list">
      {this.state.conversations.map((conversation, index)=>{
        return (
          <div className="conversation" key={index} onClick={()=>{this.props.changeChat(conversation.chat_id)}}>
            <img  src="daryl.png"/>
            <div className="title-text">
              {conversation.chat_name}
            </div>
            <div className="created-date">
              chat_date
            </div>
            <div className="conversation-message">
              chat_message
            </div>
          </div>
        )
      })}
      </div>
    )
  }
}

export default ConversationList
