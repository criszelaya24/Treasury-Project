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
    constructor(props) {
        super(props);
        this.state = { 
            facturas: [],
            empresasLoaded: false,
            id_empresa: 1,
            empresas: [],
            nombreEmpresa: 'Fanatiz',
            facturasLoaded: false,
            tokenInvalid: false,
            filterFacturas: false
        };
        this.handleEmpresaChange = this.handleEmpresaChange.bind(this);
    }
    
    async getEmpresas(){
        const response = await fetch('/api/empresas', {
            headers: new Headers({
                'Authorization': 'Bearer ' + this.props.user.token, 
            })
        });
        if (response.ok){
            const json = await response.json();
            this.setState({ empresas: json.data, empresasLoaded: true, tokenInvalid: false});
        } else {
            this.setState({tokenInvalid: true})
        }
    }

    async getFacturas(){
        const response = await fetch('/api/facturas', {
            headers: new Headers({
                'Authorization': 'Bearer ' + this.props.user.token, 
            })
        }
        );
        if (response.ok){
            const json = await response.json();
            this.setState({ facturas: json.data, facturasLoaded: true, tokenInvalid: false});
        } else {
            this.setState({tokenInvalid: true})
        }
    }

    async componentDidMount() {
        this.getEmpresas();
        this.getFacturas();
    }

    componentDidUpdate() {
        this.checkStateToken()
    }

    checkStateToken () {
        if (this.state.tokenInvalid) this.props.logout();
    }

    handleEmpresaChange(event){
        if (event.target.value === 'all') this.setState({filterFacturas: false});
        if (event.target.value !== 'all') {
            this.setState({id_empresa: event.target.value})
            let empresa_actual =  this.state.empresas.filter(empresa => {return (empresa.id === event.target.value)})[0].nombre
            this.setState({nombreEmpresa: empresa_actual, filterFacturas: true})
        }
    }

    getFacturasList(){
        let filtered = this.state.facturas.length > 0 ? this.state.facturas.filter(factura => {return (factura.empresa === this.state.nombreEmpresa)}) : [];
        let sorted = filtered.sort(function (a, b) {
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
        if (this.state.empresas.length > 0){
            selector =  <div className='selectorEmpresa'>
                                <InputLabel id="demo-simple-select-label">Filter by Empresa</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    onChange={this.handleEmpresaChange}
                                    value = {this.state.id_empresa}
                                    
                                >
                                <MenuItem value="all" key="all">All Facturas</MenuItem>
                                {this.state.empresas.map(row => (
                                        <MenuItem value={row.id} key={row.id}>{row.nombre}</MenuItem>
                                ))}
                                </Select>
                        </div>
        } else {
            selector = <CircularProgress className="circularProgress"/>
        }
        let tabla;
        const filteredFacturas = this.state.filterFacturas ? this.getFacturasList() : this.state.facturas
        if (this.state.facturasLoaded){
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
                            <Fab href = {'facturas/new'} color="primary" aria-label="add" >
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
