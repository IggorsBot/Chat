import React from 'react'

class ConversationList extends React.Component{
  render(){
    return(
      <div id="conversation-list">
        <div className="conversation active">
          <img  src="daryl.png"/>
          <div className="title-text">
            Daryl Duckmanton
          </div>
          <div className="created-date">
            Apr 16
          </div>
          <div className="conversation-message">
            This is a message.
          </div>
        </div>
        <div className="conversation">
          <img  src="daryl.png"/>
          <div className="title-text">
            Kim O'Nell
          </div>
          <div className="created-date">
            2 days ago
          </div>
          <div className="conversation-message">
            Very funny.
          </div>
        </div>
        <div className="conversation">
          <img  src="daryl.png"/>
          <div className="title-text">
            Daryl Duckmanton
          </div>
          <div className="created-date">
            Apr 16
          </div>
          <div className="conversation-message">
            This is a message.
          </div>
        </div>
        <div className="conversation">
          <img  src="daryl.png"/>
          <div className="title-text">
            Daryl Duckmanton
          </div>
          <div className="created-date">
            Apr 16
          </div>
          <div className="conversation-message">
            This is a message.
          </div>
        </div>
        <div className="conversation">
          <img  src="daryl.png"/>
          <div className="title-text">
            Daryl Duckmanton
          </div>
          <div className="created-date">
            Apr 16
          </div>
          <div className="conversation-message">
            This is a message.
          </div>
        </div>
      </div>
    )
  }
}

export default ConversationList
