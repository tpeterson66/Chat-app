import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import ProtectedRoute from './protectedRoute'
import AuthIsAuthenticated from './authentication/isAuthenticated'
import AppBar from './components/Navigation/AppBar/AppBar'
import Chat from './containers/Chat/Chat'
import Blog from './containers/Blog/Blog'
import Login from './containers/Login/Login'
import Home from './containers/Home/Home'
import Register from './containers/Register/Register'

function App() {
  console.log(AuthIsAuthenticated())

  return (
    <div>
    <div className="w3-row">
      <AppBar />
    </div>
    <div style={{ marginTop: "51px" }}>
      <Route path="/" exact component={Home} />
      <Route path="/home" component={Home} />
      <ProtectedRoute path="/chat"  component={Chat}/>
      <ProtectedRoute path="/blog"  component={Blog}/>
      <Route path="/login"  component={Login} />
      <Route path="/register"  component={Register} />
    </div>
  </div>
  );
}

export default App;
