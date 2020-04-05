import React from 'react'
import axios from 'axios'


class ConversationList extends React.Component{
  state = {
    user_id: 1,
    conversations: [
      {title: "Daryl Duckmanton", date: "Apr 16", message: "This is a message"},
      {title: "Kim O'Nell", date: "Apr 16", message: "Very funny"},
      {title: "Daryl Duckmanton", date: "Apr 16", message: "This is a message"},
    ]
  }

  componentDidMount(){
    this.getConversations()
  }

  getConversations = async () => {
      try {
        console.log('test')
        let result = await axios(`http://127.0.0.1:8080/chat/conversations`, {
          method: "get",
          withCredentials: true
        })
        console.log(result.data)
        this.setState({conversations: result.data})
    } catch (error) {
      console.log("error", error)
    }
  }

  render(){
    return(
      <div id="conversation-list">
      {this.state.conversations.map((conversation, index)=>{
        return (
          <div className="conversation" key={index} onClick={()=>{this.props.changeChat(index)}}>
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
