import React, { Fragment } from 'react';
import Chat from '../containers/Chat/Chat'
import AppBar from '../components/Navigation/AppBar/AppBar'

const layout = props => {
  return (
    <div>
      <AppBar />

        <Chat />

      <Fragment> Footer </Fragment>
    </div>
  )
}
export default layout;