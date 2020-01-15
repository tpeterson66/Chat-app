import React from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


export default (props) => (
  <div>
    <TextField
      id="filled-full-width"
      label="New Message"
      style={{ margin: 8 }}
      placeholder="Type a new message here!"
      // helperText="New Message"
      fullWidth
      margin="normal"
      InputLabelProps={{
        shrink: true,
      }}
      variant="outlined" />

    <Button variant="outlined" color="primary">
      Send
    </Button>

  </div>
);