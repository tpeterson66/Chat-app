import React, { useState } from 'react';
import axios from 'axios';

const Login = (props) => {
    const [user, setUser] = useState({ email: null, password: null })
    const [connectivityError, setConnectivityError] = useState(false)
    const [loginError, setLoginError] = useState(false)
    const [loggingIn, setLoggingIn] = useState(false)

    const formOnChangeHandler = (event) => {
        let copyUser = { ...user }
        copyUser[event.target.name] = event.target.value
        setUser(copyUser)
    }

    const handleSubmit = event => {
        event.preventDefault();
        if (!user.email || !user.password) {
            setLoginError(true)
            setConnectivityError(false)
            return
        }
        setLoginError(false)
        setConnectivityError(false)
        setLoggingIn(true)
        // API Call to login user
        async function loginUser() {
            await axios.post(`${process.env.REACT_APP_AUTH_API}/login`, user)
                .then((result) => {
                    props.history.push('/chat')
                })
                .catch((err) => {
                    setLoggingIn(false)
                    if (!err.response) return setConnectivityError(true)
                    if (err.response.status === 403) return setLoginError(true)
                })
        }
        loginUser()
    }

    let connectivityErrorMessage = null
    if (connectivityError) {
        connectivityErrorMessage = (<div className="w3-panel w3-center w3-pale-red w3-round-xlarge">
            <p> Cannot access the authentication server, try again soon! </p>
        </div>)
    }

    let loginErrorMessage = null
    if (loginError) {
        loginErrorMessage = (<div className="w3-panel w3-center w3-pale-yellow w3-round-xlarge">
            <p> There's an issue with your login! Please enter valid credentials! </p>
        </div>)
    }

    let loggingInMessage = null
    if (loggingIn) {
        loggingInMessage = (<div className="w3-panel w3-center w3-pale-green w3-round-xlarge">
            <p> Logging in!</p>
        </div>)
    }

    return (
        <div>
            {loggingInMessage}
            {connectivityErrorMessage}
            {loginErrorMessage}
            <form onSubmit={handleSubmit} className="w3-container w3-card-4 w3-light-grey w3-text-blue w3-margin">
                <h2 className="w3-center">Login</h2>

                <div className="w3-row w3-section">
                    <div className="w3-col" style={{ width: "50px" }}><i className="w3-xxlarge fa fa-envelope"></i></div>
                    <div className="w3-rest">
                        <input onChange={formOnChangeHandler} className="w3-input w3-border" name="email" type="text" placeholder="Email" />
                    </div>
                </div>

                <div className="w3-row w3-section">
                    <div className="w3-col" style={{ width: "50px" }}><i className="w3-xxlarge fa fa-lock"></i></div>
                    <div className="w3-rest">
                        <input onChange={formOnChangeHandler} className="w3-input w3-border" name="password" type="password" placeholder="Password" />
                    </div>
                </div>
                <div className='w3-bar w3-center'>
                    <button className="w3-button w3-green">Login</button>
                </div>
            </form>
            
        </div>
    )
}

export default Login;