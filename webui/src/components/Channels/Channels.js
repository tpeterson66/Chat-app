import React from 'react';
import Channel from './Channel/Channel'

// Material
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/MoveToInbox';

const drawerWidth = "25%";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    position: "relative"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  }
}));

export default function PermanentDrawerLeft() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <p style={{ padding: "5px", textAlign: "center" }}> <strong>Channels</strong></p>
        <Divider />
        <Channel text='General' icon={<InboxIcon />} />
      </Drawer>
    </div>
  );
}