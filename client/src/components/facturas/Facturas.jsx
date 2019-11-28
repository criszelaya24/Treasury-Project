import React, { Component } from 'react';
import TablaFacturas from './TablaFacturas';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import './Facturas.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';


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
        this.setState({id_empresa: event.target.value})
    }

    getFacturasList(){
        let filtered = this.state.facturas.filter(factura => {return (factura.empresa === this.state.id_empresa)});
        let sorted = filtered.sort(function (a, b) {
            console.log(a);
            console.log(b);
            if (a.fecha > b.fecha) {
                return 1;
            }
            if (b.fecha > a.fecha) {
                return -1;
            }
            return 0;
        });
        return sorted;
    }

    render() {
        let selector;
        if (this.state.empresas.length){
            selector =  <div className='selectorEmpresa'>
                                <InputLabel id="demo-simple-select-label">Empresa</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    onChange={this.handleEmpresaChange}
                                    value = {this.state.id_empresa}
                                    
                                >
                                {this.state.empresas.map(row => (
                                        <MenuItem value={row.id} key={row.id}>{row.nombre}</MenuItem>
                                ))}
                                </Select>
                        </div>
        } else {
            selector = <CircularProgress className="circularProgress"/>
        }
        let tabla;
        const filteredFacturas = this.getFacturasList()
        if (this.state.facturasLoaded && this.state.proveedoresLoaded){
            tabla = <div className='tableFacturas'><TablaFacturas rows={filteredFacturas} proveedores={this.state.proveedores} /></div>;
        } else {
            tabla = <CircularProgress />;
        }
        return (
            <div className='container'>
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        {selector}
                    </Grid>
                    <Grid item xs={6}>
                    <Typography variant="h4" align="center">
                        Cuentas por Pagar
                    </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <div className='spacedButtons'>
                            <Fab color="primary" aria-label="add" >
                                <AddIcon />
                            </Fab>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        {tabla}
                    </Grid>
                </Grid>
            </div>
        )
    }
}
