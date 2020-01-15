import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

export default (props) => (
  <ListItem button key={props.text}>
  <ListItemIcon>{props.icon}</ListItemIcon>
  <ListItemText primary={props.text} />
</ListItem>
)

