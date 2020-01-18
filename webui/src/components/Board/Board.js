import React from 'react';
import Message from './Message/Message'

export default function FixedContainer(props) {

  let message = props.messages.map((msg, i) => {
    return <Message
      username={msg.username}
      date={msg.date}
      message={msg.message}
      avatar={msg.avatar}
      key={i} />
  })

  return (
    <div className="w3-container w3-light-grey" style={{ marginBottom: "8%", overflowY: "scroll"}}>
      <h1 className="w3-wide w3-text-blue">{props.channel.toUpperCase()}</h1>
      <ul className="w3-ul w3-card-4">
        {message}
      </ul>
    </div>
  );
}