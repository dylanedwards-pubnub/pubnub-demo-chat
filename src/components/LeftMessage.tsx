import React from 'react'
import {messageData} from '../types/chatMessage'

interface ILeftMessageProps {
    chatMessage: messageData
}

const LeftMessage = (props: ILeftMessageProps) => {

  const timeValue = new Date(Number(props.chatMessage.timetoken)/1e4);

    return (
        <li className="clearfix">
        <div className="message-data">
          <span className="message-data-time">

            <p className='message-info'>{timeValue.toString()}</p>
            <p>{props.chatMessage.sender}</p>
          </span>
        </div>
        <div className="message left-message">
          {props.chatMessage.message}
        </div>
      </li>
    )
}

export default LeftMessage
