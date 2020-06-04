import React, { Component, Suspense } from "react";
import Layout from '../src/hoc/Layout/Layout'
import BurgerBuild from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from '../src/containers/Checkout/Checkout'
import Orders from '../src/containers/Orders/Orders'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import AuthForm from '../src/containers/Auth/Auth'
import Logout from './containers/Auth/LogOut/LogOut'
import { connect } from 'react-redux'
import * as actions from './store/action/index'

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup()
  }
  render() {
    let routes = (
      <Switch>
        <Route path='/auth' component={AuthForm} />
        <Route exact path="/" component={BurgerBuild} />
        <Redirect to='/' />
      </Switch>
    )

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/checkout' component={Checkout} />
          {/* <Route path='/checkout' render={() => (
            <Suspense fallback={<div>Loading...</div>} >
              <Checkout {...this.props} />
            </Suspense>
          )} /> */}
          < Route path='/orders' component={Orders} />
          <Route path='/logout' component={Logout} />
          {/* <Route path='/auth' component={AuthForm} /> */}
          <Route path='/auth' render={() => (
            <Suspense fallback={<div>Loading...</div>} >
              <AuthForm />
            </Suspense>
          )} />
          <Route exact path="/" component={BurgerBuild} />
        </Switch>
      )
    }


    return (
      <div>
        <Layout>
          {routes}



        </Layout>
      </div>
    )
  }
}

const matchStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}


const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}
export default withRouter(connect(matchStateToProps, mapDispatchToProps)(App));
