import React, { Component } from 'react'
import { getCookie } from '../helpers/cookies';

export default class Proveedores extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            proveedores: [],
            proveedoresLoaded: false,
        };
    }
    
    componentDidMount(){
        this.getProveedores()
    }

    async getProveedores(){
        const response = await fetch('/api/proveedores', {
            headers: new Headers({
                'Authorization': 'Bearer ' + getCookie('token'), 
            })
        }
        );
        const json = await response.json();
        console.log(json)
        this.setState({ proveedores: json.data, proveedoresLoaded: true});
        console.log(this.state)
    }

    render() {
        return (
            <div>
                {this.state.proveedores.map(prov => {
                    return <h1>{prov.nombre}</h1>
                })}
            </div>
        )
    }
}
