import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'

function App(){
	return (
		<Router>
			<div className="ui container">
				<Route exact path = '/' component={Home}/>
        <Route exact path = '/login' component={Login}/>
			</div>
		</Router>
	)
}

export default App;
