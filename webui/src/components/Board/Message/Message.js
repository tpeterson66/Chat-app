import React from 'react';

export default (props) => (
  <li key={props._id} class="w3-bar w3-light-grey">
    <img alt='avatar' src={props.avatar || "https://www.w3schools.com/w3css/img_avatar2.png"} className="w3-bar-item w3-circle w3-hide-small" style={{ width: "85px" }} />
    <div className="w3-bar-item">
      <span class="w3-large"> <strong>{props.username} </strong></span> <span>{props.date}</span><br />
      <span>{props.message}</span>
    </div>
  </li>
)