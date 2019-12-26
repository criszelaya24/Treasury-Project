import { Button } from '@material-ui/core';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import './Facturas.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import CurrencyInput from '../common/currencyInput';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class CreateFactura extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            folio: 0,
            id_empresa: 1,
            id_proveedor: 1,
            id_currency: 1,
            fecha: new Date(),
            expire: new Date(),
            empresas: [],
            proveedores: [],
            currencies: [],
            monto: 0,
            detalle: '',
            processing: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleExpireChange = this.handleExpireChange.bind(this);
    }

    async getEmpresas(){
        const response = await fetch('/api/empresas', {
            headers: new Headers({
                'Authorization': 'Bearer ' + this.props.user.token, 
            })
        });
        const json = await response.json();
        this.setState({ empresas: json.data, empresasLoaded: true});
    }

    async getProveedores(){
        const response = await fetch('/api/proveedores', {
            headers: new Headers({
                'Authorization': 'Bearer ' + this.props.user.token, 
            })
        });
        const json = await response.json();
        console.log(json)
        this.setState({ proveedores: json.data, proveedoresLoaded: true});
    }

    async getCurrencies(){
        const response = await fetch('/api/currencies', {
            headers: new Headers({
                'Authorization': 'Bearer ' + this.props.user.token, 
            })
        });
        const json = await response.json();
        console.log(json)
        this.setState({ currencies: json.data, currenciesLoaded: true});
    }

    async componentDidMount() {
        this.getEmpresas();
        this.getProveedores();
        this.getCurrencies();
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleDateChange(date){
        this.setState({fecha: date})
    }

    handleExpireChange(date){
        this.setState({expire: date})
    }

    async handleSubmit(){
        this.setState({processing: true})
        let amount = this.state.monto.toString().replace(/,/g,'').replace('$', '')
        let body = {
                numero: parseInt(this.state.folio),
                proveedor: this.state.id_proveedor,
                currency: this.state.id_currency,
                monto: amount,
                detalle: this.state.detalle,
                fecha: this.formatfecha(this.state.fecha),
                vencimiento: this.formatfecha(this.state.expire),
                status: 1,
                empresa: this.state.id_empresa
        }
        console.log(body)
        const response = await fetch('/api/facturas', {
            method: 'POST',
            headers: new Headers({
                'Authorization': 'Bearer ' + this.props.user.token, 
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(body)
        }
        );
        const json = await response.json();
        console.log(json)
    }

    formatfecha(fecha){
        return fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds()
    }
    
    render() {
        let selector_empresas;
        if (this.state.empresas.length > 0){
            selector_empresas =  <div className='selectorEmpresa'>
                                <InputLabel id="demo-simple-select-label">Empresa</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    onChange={this.handleChange}
                                    value = {this.state.id_empresa}
                                    name={'id_empresa'}
                                >
                                {this.state.empresas.map(row => (
                                        <MenuItem value={row.id}  key={row.id}>{row.nombre}</MenuItem>
                                ))}
                                </Select>
                        </div>
        } else {
            selector_empresas = <CircularProgress className="circularProgress"/>
        }
        let selector_provs;
        if (this.state.proveedores.length > 0){
            selector_provs =  <div className='selectorEmpresa'>
                                <InputLabel id="demo-simple-select-label">Proveedor</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    onChange={this.handleChange}
                                    value = {this.state.id_proveedor}
                                    name={'id_proveedor'}
                                >
                                {this.state.proveedores.map(row => (
                                        <MenuItem value={row.id} key={row.id}>{row.name}</MenuItem>
                                ))}
                                </Select>
                        </div>
        } else {
            selector_provs = <CircularProgress className="circularProgress"/>
        }
        let selector_currency;
        if (this.state.currencies.length > 0){
            selector_currency =  <div className='selectorEmpresa'>
                                <InputLabel id="demo-simple-select-label">Moneda</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    onChange={this.handleChange}
                                    value = {this.state.id_currency}
                                    name={'id_currency'}
                                >
                                {this.state.currencies.map(row => (
                                        <MenuItem value={row.id} key={row.id}>{row.name}</MenuItem>
                                ))}
                                </Select>
                        </div>
        } else {
            selector_currency = <CircularProgress className="circularProgress"/>
        }
        return (
            <div style={{marginLeft: '10%', marginRight:'10%'}}>
                <React.Fragment>
                <Typography variant="h6" gutterBottom>
                    Crear Nueva Cuenta
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={3}>
                    <TextField
                        required
                        id="Folio"
                        name="folio"
                        type="number"
                        label="Numero de Folio"
                        value={this.state.folio}
                        onChange={this.handleChange}
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    {selector_empresas}
                    </Grid>
                    <Grid item xs={12}>
                    {selector_provs}
                    </Grid>
                    <Grid item xs={12}>
                    <CurrencyInput placeholder="0.00" type="text" name="monto" value={this.monto} onChange={this.handleChange}/>
                    {selector_currency}
                    </Grid>
                    <Grid item xs={12}>
                    <InputLabel id="demo-simple-select-label">Fecha</InputLabel>
                    <DatePicker selected={this.state.fecha} onChange={this.handleDateChange} />
                    </Grid>
                    <Grid item xs={12}>
                    <InputLabel id="demo-simple-select-label">Expiración</InputLabel>
                    <DatePicker selected={this.state.expire} onChange={this.handleExpireChange} />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        id="detalle"
                        name="detalle"
                        label="Detalle"
                        fullWidth
                        value={this.state.detalle}
                        onChange={this.handleChange}
                    />
                    </Grid>
                </Grid>
                <Button type="button" disabled={this.state.processing} onClick={this.handleSubmit}>
                    Crear
                </Button>
                </React.Fragment>
            </div>
        )
    }
}