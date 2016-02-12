import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'
import SampleComponent from './components/Sample-component'
// import LoginComponent from './components/login-component'
import Login from './containers/login'
import auth from './shared/auth'

const App = React.createClass({
  getInitialState() {
    return {
      // loggedIn: auth.loggedIn()
      loggedIn: auth.loggedOut()
    }
  },

  updateAuth(loggedIn) {
    this.setState({
      loggedIn: loggedIn
    })
  },

  componentWillMount() {
    auth.onChange = this.updateAuth
    auth.login()
  },

  render() {
    return (
      <div>
        <h1>App</h1>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li>
            {this.state.loggedIn ? (
              <Link to="/logout">Log out</Link>
            ) : (
              <Link to="/login">Log in</Link>
            )}
          </li>
          <li><Link to='/password-recovery'>Password Recovery</Link></li>
          <li><Link to='/wizard'>Wizard</Link></li>
          <li><Link to='/dashboard'>Dashboard</Link></li>
          <li><Link to='/test-view'>Test View</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
})

const LoginView = React.createClass({
  render() {
    return <Login location={this.props} />
  }
})

const Logout = React.createClass({
  componentDidMount() {
    auth.logout()
  },

  render() {
    return <p>You are now logged out</p>
  }
})

const PasswordRecovery = React.createClass({
  render() {
    return <h3>Password Recovery</h3>
  }
})

const Wizard = React.createClass({
  render() {
    return <h3>Wizard</h3>
  }
})

const Dashboard = React.createClass({
  render() {
    return <h3>Dashboard</h3>
  }
})

const TestView = React.createClass({
  render() {
    return <SampleComponent />
  }
})

function requireAuth(nextState, replace) {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <Route path='login' component={LoginView} />
      <Route path="logout" component={Logout} />
      <Route path='password-recovery' component={PasswordRecovery} />
      <Route path='wizard' component={Wizard} onEnter={requireAuth}/>
      <Route path='dashboard' component={Dashboard} onEnter={requireAuth}/>
      <Route path='test-view' component={TestView} />
    </Route>
  </Router>
), document.getElementById('app'))