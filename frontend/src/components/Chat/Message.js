import React, {Fragment} from 'react'

function Message (props) {
    var date = new Date(props.message.date_create);

    var month_array = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
  ]

    var day = date.getDate()
    var month = month_array[date.getMonth()]
    var year = date.getFullYear()
    var fullDate = day + ' ' + month + ' ' + year

    const yourMessage =
      <div className="message-row you-message">
        <div className="message-content">
          <div className="message-time">{date.getHours()}:{date.getMinutes()}</div>
          <div className="message-text">{props.message.contect}</div>
        </div>
      </div>


    const otherMessage =
    <div className="message-row other-message">
      <div className="message-content">
        <img  src="daryl.png"/>
        <div className="message-time">{date.getHours()}:{date.getMinutes()}</div>
        <div className="message-text">{props.message.contect}</div>
      </div>
    </div>


    const dateMessage =
    <div className="message-date">
      {fullDate}
    </div>

    return (
      <Fragment>
        {props.day ? dateMessage : null}
        {props.message.user_id == props.user_id ? yourMessage: otherMessage}
      </Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};

export default Message
