import React, { Component } from 'react'
import './App.css'
import { constants } from 'crypto';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      proveedores : []
    }
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  
  async componentDidMount() {
    const response = await fetch('api/proveedores')
    const json = await response.json();
    const result = json
    this.setState({proveedores: result})
  }

  render() {
        
    return (
      <div className="App">
        <h1> HOLA</h1> 
        {this.state.proveedores.map(el => (
            <li>
              {el.nombre}
            </li>
          ))}
      </div>
    )
  }
}
export default App