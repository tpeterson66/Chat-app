import React from 'react';
import Chat from '../containers/Chat/Chat'
import AppBar from '../components/Navigation/AppBar/AppBar'

const layout = props => {
  return (
    <div>
      <div className="w3-row">
        <AppBar />
      </div>
      <div className="w3-row">
        <Chat />
      </div>
    </div>
  )
}
export default layout;