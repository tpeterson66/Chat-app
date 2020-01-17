import React from 'react';
import Channel from './Channel/Channel'

export default function Channels(props) {

  return (
    <div style={{marginTop: "51px"}} className="w3-sidebar w3-indigo w3-bar-block">
      <Channel clicked={() => props.changeChannel("general")} text="General" icon="fa-home" active />
      <Channel clicked={() => props.changeChannel("javascript")} text="Javascript" icon="fa-truck" />
      <Channel text="Trash" icon="fa-trash" />
      <Channel text="Planes" icon="fa-plane" />
    </div>
  );
}