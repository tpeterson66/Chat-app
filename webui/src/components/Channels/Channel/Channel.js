import React from 'react'

export default (props) => {
  let classes = ["w3-bar-item", "w3-button", "w3-hover-teal"]
  if (props.active) classes.push("w3-light-blue")
  return (
    <button
      onClick={props.clicked}
      href="#"
      className={classes.join(" ")}>
      <i style={{ paddingRight: "10px" }} className={"fa " + props.icon} />{props.text}
    </button>
  )
}
