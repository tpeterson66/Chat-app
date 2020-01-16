import React from 'react';
import Board from '../../components/Board/Board'
import Channels from '../../components/Channels/Channels'
import NewMessage from '../../components/NewMessage/NewMessage'

export default (props) => {

  return (
    <div className="w3-row">
      <div> <Channels /> </div>
      <div className="w3-container" style={{ marginLeft: "180px" }}>
        <Board />
        <NewMessage />
      </div>
    </div>
  )
};