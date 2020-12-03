import React, { Fragment } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import "./App.css"
import { Login } from "./components/auth/Login"
import { Landing } from "./components/layout/Landing"
import { Navbar } from "./components/layout/Navbar"
import { Register } from "./components/auth/Register"
//redux
import { Provider } from "react-redux"
import store from "./store"

const App = () => (
  <Provider>
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <section className="container">
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  </Provider>
)

export default App
