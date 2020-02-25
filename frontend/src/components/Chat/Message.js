import React from 'react'

function Message ({name, message}) {
  return (
    <div className="my-5">
      <p>
        <strong>{name}</strong> <em>{message}</em>
      </p>
    </div>

  )
}

export default Message
