import React from 'react';
import Channel from './Channel/Channel'

export default function Channels(props) {

  let Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const channelOutput = props.channels.map((ch) => {
    let isActive = false
    if (props.currentChannel === ch.channel) isActive = true
    return (
      <Channel
        key={ch.id}
        clicked={() => props.changeChannel(ch.channel)}
        text={Capitalize(ch.channel)}
        icon={ch.icon}
        active={isActive} />
    )
  });

  return (
    <div className="w3-sidebar w3-indigo w3-bar-block">
      {channelOutput}
    </div>
  );
};