import React from 'react'
import Facturas from './components/facturas/Facturas'
import CreateFactura from './components/facturas/CreateFactura'
import DetalleFactura from './components/facturas/DetalleFactura'
import './App.css'
import PrivateRoute from './components/common/protectedRoute'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Login from './components/login/Login';
import Proveedores from './components/proveedores/Proveedores'
import Navbar from './components/navbar/Navbar'


const userContext = React.createContext({
  user: {
    isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn')) || false,
    token: JSON.parse(localStorage.getItem('token'))  || ''
  }
});

export default class App extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    user: {
      isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn')) || false,
      token: JSON.parse(localStorage.getItem('token'))  || ''
    }
  };
  this.signIn = this.signIn.bind(this);
  this.logout = this.logout.bind(this);
  }

  signIn(user){
    localStorage.setItem('isLoggedIn', JSON.stringify(true));
    localStorage.setItem('token', JSON.stringify(user.token));
    this.setState({
      user: {
      isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn')) || false,
      token: JSON.parse(localStorage.getItem('token'))  || ''
    }})
  }

  // Add a logout method
  logout() {
    console.log('Logout')
    localStorage.clear();
    console.log(localStorage)
    this.setState({
      user: {
      isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn')) || false,
      token: JSON.parse(localStorage.getItem('token'))  || ''
    }})
    console.log(this.state)

  }

  render() {
    // compose value prop as object with user object and logout method
    const value = {
      user: this.state.user,
      logoutUser: this.logout,
      signIn: this.signIn
    }
    return (
      <userContext.Provider value={value}>
        <Router>
              <userContext.Consumer>
              {({user, logoutUser, signIn}) => {
                return (
                  <div>

                  <Navbar user={user} logout={logoutUser}/>
                  <Switch>
                    <Route path="/login">
                      <Login signIn={signIn}/>
                    </Route>
                    <PrivateRoute path="/proveedores" user={user}>
                      <Proveedores  user={user}/>
                    </PrivateRoute>
                    <PrivateRoute path="/facturas/new" user={user}>
                      <CreateFactura user={user} />
                    </PrivateRoute>
                    <PrivateRoute path="/facturas/:id" user={user}>
                      <DetalleFactura />
                    </PrivateRoute>
                    <PrivateRoute path="/" user={user}>
                      <Facturas user={user} />
                    </PrivateRoute>
                    <PrivateRoute path="/facturas" user={user} signIn={signIn}>
                      <Facturas />
                    </PrivateRoute>
                    <PrivateRoute path="/" user={user}>
                      <Facturas />
                    </PrivateRoute>
                  </Switch>
                  </div>

                );
              }}
              </userContext.Consumer>
        </Router>
      </userContext.Provider>
    );
  }
}