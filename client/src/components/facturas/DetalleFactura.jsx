import React, { Component } from 'react';
import './Facturas.css';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { withStyles} from '@material-ui/core/styles';
import PublishIcon from '@material-ui/icons/Publish';
import Fab from '@material-ui/core/Fab';

const styles = theme => ({
  buttons: {    
    padding: '1%', 
    marginRight: '1%'  
  },
});

class DetalleFactura extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classes: this.props.styles,
            id: this.props.match.params.id,
            facturasLoaded: false,
            proveedor: '',
            empresa: '',
            factura: {
                currency: "",
                detalle: "",
                empresa: 1,
                fecha: "",
                id: 1,
                monto: "",
                numero: 1,
                proveedor: 1,
                status: "",
                vencimiento: "",
            }
        }
    }

    componentDidMount(){
        this.getFactura();
        this.getProveedor();
        this.getEmpresa();

    }

    async getFactura(){
        const response = await fetch('/api/facturas/' + this.state.id);
        const json = await response.json();
        let factura = json[0]
        this.setState({ factura: factura, facturasLoaded: true});
    }

    async getProveedor(){
        const response = await fetch('/api/proveedores/' + this.state.factura.proveedor);
        const json = await response.json();
        let proveedor = json[0];
        this.setState({ proveedor: proveedor});
    }

    async getEmpresa(){
        const response = await fetch('/api/empresas/' + this.state.factura.empresa);
        const json = await response.json();
        let empresa = json[0];
        this.setState({ empresa: empresa});
    }

    render() {
        const { classes } = this.props;
        let tablaFactura;
        if (this.state.facturasLoaded){
            tablaFactura = <div>
                    <Typography variant="h3" component="h2" align='center'>
            Factura {this.state.factura.numero} - {this.state.proveedor.nombre}
            </Typography>
            <List >
                <ListItem>
                    <ListItemText primary="Empresa" secondary={this.state.empresa.nombre} />
                    <ListItemText primary="N° Factura" secondary={this.state.factura.numero}/>
                    <ListItemText primary="Proveedor" secondary={this.state.proveedor.nombre} />
                    <ListItemText primary="Fecha" secondary={this.state.factura.fecha.substring(0, 10)}/>
                    <ListItemText primary="Vencimiento" secondary={this.state.factura.vencimiento.substring(0, 10)}/>
                </ListItem>
                <Divider component="li" />
                <ListItem>
                    <ListItemText primary="Detalle" secondary={this.state.factura.detalle} />
                </ListItem>
                <Divider component="li" />
                <ListItem>
                    <ListItemText primary="Status" secondary={this.state.factura.status} />
                    <ListItemText primary="Monto" secondary={'$' + this.state.factura.monto + ' ' + this.state.factura.currency} />
                        <Button 
                            variant="contained" 
                            color="primary"
                            className={classes.buttons}
                        >
                            Aprobar
                        </Button>
                        <Button 
                            variant="contained" 
                            color="default" 
                            className={classes.buttons}
                        >
                            Editar
                        </Button>
                        <Button 
                            variant="contained" 
                            color="secondary"
                            className={classes.buttons}
                        >
                            Eliminar
                        </Button>
                </ListItem>
                <Divider component="li" />
                <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <AccountCircle />
                    </Grid>
                    <Grid item>
                        <TextField 
                            id="outlined-multiline-static"
                            multiline
                            rows="4"
                            margin="normal"
                            variant="outlined"
                            label="Ingresar Comentario" 
                        />
                    </Grid>
                    <Grid item>
                        <Fab color="secondary" aria-label="add" className={classes.margin}>
                            <PublishIcon />
                        </Fab>
                    </Grid>
                </Grid>
                </List>
                </div>
        } else {
            tablaFactura = <CircularProgress />;
        }
        return (
            <div className='ListaFactura'>
                <Button variant="contained" href="/facturas/" color="primary">
                    Volver
                </Button>
                {tablaFactura}
            </div>
        )
    }
}

export default withStyles(styles)(DetalleFactura);