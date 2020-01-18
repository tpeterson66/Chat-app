import React from 'react';
import { Route } from 'react-router-dom'
import AppBar from './components/Navigation/AppBar/AppBar'
import Chat from './containers/Chat/Chat'
import Blog from './containers/Blog/Blog'
import Login from './containers/Login/Login'
import Home from './containers/Home/Home'

function App() {
  return (
    <div>
    <div className="w3-row">
      <AppBar />
    </div>
    <div style={{ marginTop: "51px" }}>
      <Route path="/" exact component={Home} />
      <Route path="/home" component={Home} />
      <Route path="/chat"  component={Chat} />
      <Route path="/blog"  component={Blog} />
      <Route path="/login"  component={Login} />
    </div>
  </div>
  );
}

export default App;
