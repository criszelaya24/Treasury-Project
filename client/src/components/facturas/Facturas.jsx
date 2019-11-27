import React, { Component } from 'react';
import TablaFacturas from './TablaFacturas';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import CircularProgress from '@material-ui/core/CircularProgress';


export default class Facturas extends Component {
    constructor() {
        super();
        this.state = { 
            facturas: [],
            empresasLoaded: false,
            id_empresa: 1,
            empresas: [],
            proveedores: [],
            proveedoresLoaded: false,
            facturasLoaded: false,
        };
        this.handleEmpresaChange = this.handleEmpresaChange.bind(this);
      }
    
    async getEmpresas(){
        const response = await fetch('/api/empresas');
        const json = await response.json();
        this.setState({ empresas: json, empresasLoaded: true});
    }

    async getFacturas(){
        const response = await fetch('/api/facturas');
        const json = await response.json();
        this.setState({ facturas: json, facturasLoaded: true});
    }

    async getProveedores(){
        const response = await fetch('/api/proveedores');
        const json = await response.json();
        this.setState({ proveedores: json, proveedoresLoaded: true});
    }
    
    async componentDidMount() {
        this.getEmpresas();
        this.getFacturas();
        this.getProveedores();
    }

    handleEmpresaChange(event){
        console.log(event.target.value)
        this.setState({id_empresa: event.target.value})
    }

    render() {
        let selector;
        if (this.state.empresas.length){
            selector = <Select
                            onChange={this.handleEmpresaChange}
                            value = {this.state.id_empresa}
                        >
                        {this.state.empresas.map(row => (
                                <MenuItem value={row.id} key={row.id}>{row.nombre}</MenuItem>
                        ))}
                        </Select>
        } else {
            selector = <CircularProgress />
        }
        let tabla;
        const filteredFacturas = this.state.facturas.filter(factura => {return (factura.empresa === this.state.id_empresa)});
        if (this.state.facturasLoaded && this.state.proveedoresLoaded){
            tabla = <TablaFacturas rows={filteredFacturas} proveedores={this.state.proveedores} />;
        } else {
            tabla = <CircularProgress />;
        }
        return (
            <div>
                <Typography variant="h2" align="center">
                    Facturas
                </Typography>
                {selector}
                {tabla}
            </div>
        )
    }
}
