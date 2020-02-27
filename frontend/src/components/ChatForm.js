import React, {Fragment} from 'react'
import PropTypes from 'prop-types'


class ChatForm extends React.Component{

  static propTypes = {
    onSubmitMessage: PropTypes.func.isRequired,
  }
  state = {
    message: '',
  }

  render() {
    return (
      <Fragment>
        <form
          action="."
          onSubmit={e => {
            e.preventDefault()
            this.props.onSubmitMessage(this.state.message)
            this.setState({ message: '' })
          }}
        >

        <div id="chat-form" style={{padding: "10px"}}>
          <img src="attachment-logo.svg"/>
            <input
              type="text"
              placeholder={'Enter message...'}
              value={this.state.message}
              onChange={e => this.setState({ message: e.target.value })}
            />
          </div>
        </form>

      </Fragment>
    )
  }
}

export default ChatForm
