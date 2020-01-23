import React, { useState } from 'react';
import Register from '../../components/Register/Register'
import Login from '../../components/Login/Login'

export default () => {

  let [login, setLogin] = useState(false)
  let [register, setRegister] = useState(false)

  const userloginHandler = (usr) => {
    console.log(usr)
  }

  const userRegistration = () => {

  }

  let dynamicContent = (
    <div>
      <p> Would you like to signup or login? </p>
      <button onClick={() => setRegister(true)} >Sign Up</button>
      <button onClick={() => setLogin(true)}>Login</button>
    </div>
  )

  if (login) dynamicContent = <Login userLogin={userloginHandler}/>
  if (register) dynamicContent = <Register />

  return (
    <div>
      {dynamicContent}
    </div>
  )
}