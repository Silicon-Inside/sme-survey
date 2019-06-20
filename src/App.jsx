import React, { Component } from 'react'

import { Router, Route, Switch } from "react-router-dom"
import { createBrowserHistory } from "history"

import routesApp from './Routes/App'

const hist = createBrowserHistory()

export default class App extends Component {
  render () {
    const stylish = {
      backgroundColor: '#fcfffd',
      padding: '50px 0px 50px 0px'
    }

    return (
      <div className="App" style={stylish}>
        <Router history={hist}>
          <Switch>{
            routesApp.map((prop, key) => {
              return (
                <Route 
                  exact={true} 
                  path={prop.path} 
                  key={key} 
                  component={prop.component} 
                />
              )
            })
          }</Switch>
        </Router>
      </div>
    )
  }
}
