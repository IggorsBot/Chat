import React, {Fragment} from 'react'

// Some components
import Title from './Title'
import Message from './Message'
import InputMessage from './InputMessage'

// Redux store
import {connect} from 'react-redux'
import store from "../../store";

// Request data
import axios from 'axios'
import 'babel-polyfill';

class Menu extends React.Component {
  _isMounted = false;

  constructor(props){
    super(props);
    this.state = {
     chat_id: -1,
     user_id: -1,
     messages: [],
   }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
   return {
    messages: nextProps.messages,
    chat_id: nextProps.chat_id
   };
  }

  ws = new WebSocket(`ws://localhost:8080/api/chat_ws`)

  getMessagesDataFromStore = () => {
    this.setState(state => ({
      user_id: store.getState().user_id,
      messages: this.props.messages
    }))
  }

  componentDidMount() {
    this._isMounted = true;

    store.subscribe(() => {
      if (this._isMounted) {
        this.getMessagesDataFromStore()
      }
    })

    this.ws.onopen = () => {}

    this.ws.onmessage = evt => {
      const message = JSON.parse(evt.data)
      this.props.addMessage(message)
    }

    this.ws.onclose = () => {}
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  writeMessage = (message, index) => {
    if (index > 0) {
      let first_date = new Date(this.state.messages[index].date_create)
      let second_date = new Date(this.state.messages[index-1].date_create)

      first_date.setHours(0, 0, 0, 0)
      second_date.setHours(0, 0, 0, 0)

      if (+first_date === +second_date){
        return <Message message={message}
                        index={index}
                        user_id={this.state.user_id}
                        key={index} day={false}/>
      }
    }
    return <Message message={message}
                    index={index}
                    user_id={this.state.user_id}
                    key={index} day={true}/>
  }

  submitMessage = messageString => {
    const message = {contect: messageString,
                     user_id: this.state.user_id,
                     chat_id: this.state.chat_id}
    this.ws.send(JSON.stringify(message))
  }

  render(){
    return (
      <Fragment>
        <Title changeAuth={this.props.changeAuth}/>

        <div id="chat-message-list">
        {this.state.messages.map((message, index)=>{
          return this.writeMessage(message, index)
        })}
        </div>

        <InputMessage ws={this.ws} onSubmitMessage={messageString => this.submitMessage(messageString)}/>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};

export default connect(mapStateToProps)(Menu)
