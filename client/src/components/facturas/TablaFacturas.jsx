import React, { Component } from 'react'
import './Facturas.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  buttons: {    
    padding: '3%', 
    marginRight: '2%'  
  },
});

class TablaFacturas extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper >
        <Table  aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="center">Fecha</TableCell>
              <TableCell align="center">Vencimiento</TableCell>
              <TableCell align="center">N° Factura</TableCell>
              <TableCell align="center">Proveedor</TableCell>
              <TableCell align="center">Monto</TableCell>
              <TableCell align="center">Detalle</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.rows.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="center">{row.fecha.substring(0, 10)}</TableCell>
                <TableCell align="center">{row.vencimiento.substring(0, 10)}</TableCell>
                <TableCell align="center">{row.numero}</TableCell>
                <TableCell align="center">{this.props.proveedores[row.proveedor].nombre}</TableCell>
                <TableCell align="center">{'$' + row.monto + ' ' + row.currency}</TableCell>
                <TableCell align="center">{row.detalle}</TableCell>
                <TableCell align="center">{row.status}</TableCell>
                <TableCell align="center">
                <Button 
                            variant="contained" 
                            color="primary"
                            className={classes.buttons}
                            href={"/facturas/" + row.id}
                        >
                            Ver
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(TablaFacturas);