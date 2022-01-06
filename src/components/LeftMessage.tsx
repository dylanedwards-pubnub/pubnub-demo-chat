import React from 'react'
import IChatMessage from '../types/chatMessage'

interface ILeftMessageProps {
    chatMessage: IChatMessage
}

const LeftMessage = (props: ILeftMessageProps) => {

  const timeValue = new Date(Number(props.chatMessage.m[0].p.t)/1e4);

    return (
        <li className="clearfix">
        <div className="message-data">
          <span className="message-data-time">

            <p className='message-info'>{timeValue.toString()}</p>
            <p>{props.chatMessage.m[0].d.sender}</p>
          </span>
        </div>
        <div className="message left-message">
          {props.chatMessage.m[0].d.message}
        </div>
      </li>
    )
}

export default LeftMessage
