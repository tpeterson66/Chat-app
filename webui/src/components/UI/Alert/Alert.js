import React from 'react'

export default (props) => {

    let classes = ["w3-panel", "w3-center", "w3-round-xlarge"]
    if (props.type === 'error') classes.push("w3-pale-red")
    if (props.type === 'warning') classes.push("w3-pale-yellow")
    if (props.type === 'success') classes.push("w3-pale-green")

    return (
        props.isActive ? <div className={classes.join(" ")}>
            <p>{props.children}</p>
        </div>
            : null
    )

}