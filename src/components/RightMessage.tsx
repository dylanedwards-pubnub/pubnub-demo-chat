import React from 'react'
import IChatMessage from '../types/chatMessage'

interface IRightMessageProps {
  chatMessage: IChatMessage
    
}

const RightMessage = (props: IRightMessageProps) => {
    return (
        <li className="clearfix">

        <div className="message right-message">
          Hi Aiden, how are you? How is the project coming along?{" "}
        </div>
      </li>
    )
}

export default RightMessage
