import React from 'react'

function Message ({name, message}) {
  return (
    <div>
      <p>
        <strong>{name}</strong> <em>{message}</em>
      </p>
    </div>

  )
}

export default Message
