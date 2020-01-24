import React, { useState, useEffect } from 'react';
import AuthLogin from '../../authentication-service/login'
import AuthLogout from '../../authentication-service/logout'
import Alert from '../../components/UI/Alert/Alert'

const Login = (props) => {
    const [user, setUser] = useState({ email: null, password: null })
    const [connectivityError, setConnectivityError] = useState(false)
    const [loginError, setLoginError] = useState(false)
    const [loggingIn, setLoggingIn] = useState(false)

    useEffect(() => {
        AuthLogout()
    },[])

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

        AuthLogin(user)
            .then(result => {
                props.history.push('/chat')
            })
            .catch(err => {
                setLoggingIn(false)
                if (!err.response) return setConnectivityError(true)
                if (err.response.status === 403) return setLoginError(true)
            })

    }

    return (
        <div>
            <Alert type="success" isActive={loggingIn} >Logging in!</Alert>
            <Alert type="error" isActive={connectivityError}>Cannot access the authentication server, try again soon!</Alert>
            <Alert type="warning" isActive={loginError}>There's an issue with your login! Please enter valid credentials!</Alert>
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