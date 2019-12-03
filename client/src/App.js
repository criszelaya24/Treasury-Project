import React from 'react'
import Facturas from './components/facturas/Facturas'
import DetalleFactura from './components/facturas/DetalleFactura'
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Login from './components/login/Login';
import Proveedores from './components/proveedores/Proveedores'

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
          </ul>
        </nav>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/proveedores" component={Proveedores}></Route>
          <Route path="/facturas/:id" component={DetalleFactura}></Route>
          <Route path="/facturas" component={Facturas}><Facturas/></Route>
          <Route path="/" component={Facturas}><Facturas/></Route>
        </Switch>
      </div>
    </Router>
  );
}