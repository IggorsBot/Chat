import React, {Fragment} from 'react'
import PropTypes from 'prop-types'


class InputMessage extends React.Component{

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
            this.setState({ message: '' })
            this.props.onSubmitMessage(this.state.message)
          }}>

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

export default InputMessage
