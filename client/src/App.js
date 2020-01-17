import React from "react"
import { Route } from "react-router-dom"
import { Router } from "react-router"

import browserHistory from "./util/browserHistory"

import Home from "./pages/Home"
import Login from "./pages/Login"

function App() {
  return (
    <Router history={browserHistory}>
      <div className="ui container">
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
      </div>
    </Router>
  )
}

export default App
