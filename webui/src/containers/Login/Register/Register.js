import React, { useState } from 'react'

export default (props) => {

    const [avatar, setAvatar] = useState({ id: 1});
    const [newUser, setNewUser] = useState({email: null, password: null, confirm: null})

    const clickAvatarHandler = (av) => {
        setAvatar(av)
    }

    let avatars = [
        { id: 1, image: "https://www.w3schools.com/w3css/img_avatar1.png" },
        { id: 2, image: "https://www.w3schools.com/w3css/img_avatar2.png" },
        { id: 3, image: "https://www.w3schools.com/w3css/img_avatar3.png" },
        { id: 4, image: "https://www.w3schools.com/w3css/img_avatar4.png" },
        { id: 5, image: "https://www.w3schools.com/w3css/img_avatar5.png" },
        { id: 6, image: "https://www.w3schools.com/w3css/img_avatar6.png" },
    ]

    let avatarRender = avatars.map(av => {
        let classes = ["w3-bar-item", "w3-circle w3-hide-small"]
        if (avatar.id === av.id ) classes.push('w3-border', "w3-border-green")
        return <img alt='avatar' key={av.id} src={av.image} className={classes.join(" ")} style={{ width: "85px", padding: "8px" }} onClick={() => clickAvatarHandler(av)} />
    })

    const formOnChangeHandler = (event, object) => {
        let copyNewUser = {...newUser}
        copyNewUser[object] = event.target.value
        setNewUser(copyNewUser)
    }

    let register = (
        <form className="w3-container w3-card-4 w3-light-grey w3-text-blue w3-margin">
            <h2 className="w3-center">Register</h2>

            <div className="w3-row w3-section">
                <div className="w3-col" style={{ width: "50px" }}><i className="w3-xxlarge fa fa-user"></i></div>
                <div className="w3-rest">
                    <input onChange={(e) => formOnChangeHandler(e, "email")} className="w3-input w3-border" name="email" type="text" placeholder="Email" />
                </div>
            </div>

            <div className="w3-row w3-section">
                <div className="w3-col" style={{ width: "50px" }}><i className="w3-xxlarge fa fa-lock"></i></div>
                <div className="w3-rest">
                    <input onChange={(e) => formOnChangeHandler(e, "password")} className="w3-input w3-border" name="password" type="text" placeholder="Password" />
                </div>
            </div>

            <div className="w3-row w3-section">
                <div className="w3-col" style={{ width: "50px" }}><i className="w3-xxlarge fa fa-lock"></i></div>
                <div className="w3-rest">
                    <input  onChange={(e) => formOnChangeHandler(e, "confirm")}className="w3-input w3-border" name="confirm" type="text" placeholder="Confrim Password" />
                </div>
            </div>

            <div className="w3-center">
                <h3> Choose your avatar! </h3>
                {avatarRender}
            </div>

            <button className="w3-button w3-block w3-section w3-blue w3-ripple w3-padding">Register</button>
        </form>
    )

    return (
        <div>{register}</div>
    )
}