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

export default class CreateFactura extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            folio: '',
            id_empresa: 1,
            empresas: [],
        };
        this.handleChange = this.handleChange.bind(this);

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
        this.setState({ proveedores: json, proveedoresLoaded: true});
    }

    async componentDidMount() {
        this.getEmpresas();
        this.getProveedores();
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit (){

    }
    
    render() {
        let selector;
        if (this.state.empresas.length > 0){
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
        return (
            <div>
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
                    {selector}
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        required
                        id="address1"
                        name="address1"
                        label="Address line 1"
                        fullWidth
                        autoComplete="billing address-line1"
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        id="address2"
                        name="address2"
                        label="Address line 2"
                        fullWidth
                        autoComplete="billing address-line2"
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="city"
                        name="city"
                        label="City"
                        fullWidth
                        autoComplete="billing address-level2"
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField id="state" name="state" label="State/Province/Region" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="zip"
                        name="zip"
                        label="Zip / Postal code"
                        fullWidth
                        autoComplete="billing postal-code"
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="country"
                        name="country"
                        label="Country"
                        fullWidth
                        autoComplete="billing country"
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                        label="Use this address for payment details"
                    />
                    </Grid>
                </Grid>
                </React.Fragment>
            </div>
        )
    }
}