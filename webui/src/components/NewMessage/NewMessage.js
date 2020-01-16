import React from 'react';

export default (props) => (
  <div style={{ marginBottom: "15px", marginLeft: "10px", paddingTop: "15px", paddingBottom: "15px" }} className="w3-row-padding w3-sand w3-bottom">
    <div class="w3-threequarter">
      <input class="w3-input w3-border" type="text" placeholder="New Message!!" />
    </div>
    <div class="w3-rest">
      <button class="w3-button w3-green w3-large"><i class="fa fa-paper-plane"></i> Send</button>
    </div>
  </div>
);