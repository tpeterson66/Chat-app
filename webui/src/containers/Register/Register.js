import React, { useState } from 'react';
import Alert from '../../components/UI/Alert/Alert'
import AuthRegisterUser from '../../authentication-service/register'

export default (props) => {

    const [avatar, setAvatar] = useState({ id: 1 });
    const [newUser, setNewUser] = useState({ email: null, username: null, password: null, confirm: null })
    const [connectivityError, setConnectivityError] = useState(false)
    const [registrationError, setRegistrationError] = useState(false)
    const [registering, setRegistering] = useState(false)
    const [accountExists, setAccountExists] = useState(false);

    const formOnChangeHandler = (event) => {
        let copyNewUser = { ...newUser }
        copyNewUser[event.target.name] = event.target.value
        setNewUser(copyNewUser)
    }

    const formOnSubmitHandler = (event) => {
        event.preventDefault();
        if (!newUser.email || !newUser.password || !newUser.confirm) {
            setRegistrationError(true)
            return
        }
        if (newUser.password !== newUser.confirm) return setRegistrationError(true)

        let apiNewUser = { ...newUser }
        apiNewUser.avatar = avatar.image
        AuthRegisterUser(apiNewUser)
            .then((result) => {
                props.history.push('/chat')
            })
            .catch((err) => {
                setRegistering(false)
                if (!err.response) return setConnectivityError(true);
                if (err.response.status === 400) return setAccountExists(true);
                if (err.response.status === 401) return setConnectivityError(true);
            })
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
        if (avatar.id === av.id) classes.push('w3-border', "w3-border-green")
        return <img alt='avatar' key={av.id} src={av.image} className={classes.join(" ")} style={{ width: "85px", padding: "8px" }} onClick={() => clickAvatarHandler(av)} />
    })
    const clickAvatarHandler = (av) => {
        setAvatar(av)
    }

    return (
        <div>
            <Alert type="error" isActive={connectivityError}>Cannot access the authentication server, try again soon!</Alert>
            <Alert type="error" isActive={registrationError}>Please provide all the information in the form!</Alert>
            <Alert type="warning" isActive={accountExists}>This email address was already used!</Alert>
            <form onSubmit={formOnSubmitHandler} className="w3-container w3-card-4 w3-light-grey w3-text-blue w3-margin">
                <h2 className="w3-center">Register</h2>

                <div className="w3-row w3-section">
                    <div className="w3-col" style={{ width: "50px" }}><i className="w3-xxlarge fa fa-envelope"></i></div>
                    <div className="w3-rest">
                        <input onChange={formOnChangeHandler} className="w3-input w3-border" name="email" type="text" placeholder="Email" />
                    </div>
                </div>

                <div className="w3-row w3-section">
                    <div className="w3-col" style={{ width: "50px" }}><i className="w3-xxlarge fa fa-user"></i></div>
                    <div className="w3-rest">
                        <input onChange={formOnChangeHandler} className="w3-input w3-border" name="username" type="text" placeholder="Username" />
                    </div>
                </div>

                <div className="w3-row w3-section">
                    <div className="w3-col" style={{ width: "50px" }}><i className="w3-xxlarge fa fa-lock"></i></div>
                    <div className="w3-rest">
                        <input onChange={formOnChangeHandler} className="w3-input w3-border" name="password" type="password" placeholder="Password" />
                    </div>
                </div>

                <div className="w3-row w3-section">
                    <div className="w3-col" style={{ width: "50px" }}><i className="w3-xxlarge fa fa-lock"></i></div>
                    <div className="w3-rest">
                        <input onChange={formOnChangeHandler} className="w3-input w3-border" name="confirm" type="password" placeholder="Confrim Password" />
                    </div>
                    {newUser.password !== newUser.confirm ? <p className="w3-center w3-pale-red" > Passwords do not match! </p> : null}
                </div>

                <div className="w3-center">
                    <h3> Choose your avatar! </h3>
                    {avatarRender}
                </div>

                <button className="w3-button w3-block w3-section w3-blue w3-ripple w3-padding">Register</button>
            </form>
            <Alert type="success" isActive={registering}>Please wait while we sign you up!</Alert>

        </div>
    )
}

