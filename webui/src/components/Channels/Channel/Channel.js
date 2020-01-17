import React from 'react'

export default (props) => {
  let classes = ["w3-bar-item", "w3-button", "w3-hover-teal"]
  if (props.active) classes.push("w3-light-blue")
  return (
    <a onClick={props.clicked} href="#" className={classes.join(" ")} ><i class={"fa " + props.icon} /> {props.text}</a>
  )
}
