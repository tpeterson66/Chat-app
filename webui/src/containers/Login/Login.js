import React, { useState } from 'react';
import Register from './Register/Register'

export default () => {

  let [register, setRegister] = useState(true)


  let login = (
register ? <Register /> :
    <form className="w3-container w3-card-4 w3-light-grey w3-text-blue w3-margin">
      <h2 className="w3-center">Login</h2>

      <div className="w3-row w3-section">
        <div className="w3-col" style={{width: "50px"}}><i className="w3-xxlarge fa fa-user"></i></div>
        <div className="w3-rest">
          <input className="w3-input w3-border" name="email" type="text" placeholder="Email" />
        </div>
      </div>

      <div className="w3-row w3-section">
        <div className="w3-col" style={{width: "50px"}}><i className="w3-xxlarge fa fa-lock"></i></div>
        <div className="w3-rest">
          <input className="w3-input w3-border" name="password" type="text" placeholder="Password" />
        </div>
      </div>
    <div className='w3-bar w3-center'>
      <button className="w3-button w3-green" style={{width: "50%"}}>Login</button>
      <button onClick={() => register = true} className="w3-button w3-blue" style={{width: "50%"}}>Sign Up</button>
    </div>

    </form>
  )



  return (
    <div>
      {login}
    {/* <Register/> */}
    </div>
  )
}