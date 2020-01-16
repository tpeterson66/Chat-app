import React from 'react';

export default function AppBar(props) {
  const links = ["Home", "Chat"]

  links.map(link => {
    let classes = ["w3-bar-item", "w3-button", "w3-hover-teal"];
    if (link === props.activeLink) classes.push("w3-light-blue")
    return <a href="#" class={classes.join(" ")}>{element}</a>
    // return <a href="#" class="w3-bar-item w3-button w3-hover-teal ">Home</a>
  })

  return (
    <div class="w3-bar w3-top w3-xlarge w3-indigo">
      <a href="#" class="w3-bar-item w3-button w3-hover-teal ">Home</a>
      <a href="#" class="w3-bar-item w3-button w3-hover-teal w3-light-blue">Chat</a>
    </div>
  );
}