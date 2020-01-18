import React from 'react'

export default props => {
  let classes = ["w3-bar-item", "w3-button", "w3-hover-teal"]
  return (
    <button className={classes.join(" ")} >{props.link}</button>
  )
}