import React, {Fragment} from 'react'

import ChatTitle from './ChatTitle'
import Conversation from './Conversation'
import ChatForm from './ChatForm'

class Chat extends React.Component {
  render(){
    return (
      <Fragment>
        <ChatTitle />
        <Conversation />
        <ChatForm />
      </Fragment>
    )
  }
}

export default Chat
