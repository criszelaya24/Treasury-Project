import React, { Component } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


export default class TablaFacturas extends Component {
  render() {
    return (
      <div>
        <Paper >
        <Table  aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="right">Fecha</TableCell>
              <TableCell align="right">Vencimiento</TableCell>
              <TableCell align="right">N° Factura</TableCell>
              <TableCell align="right">Proveedor</TableCell>
              <TableCell align="right">Monto</TableCell>
              <TableCell align="right">Detalle</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.rows.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.fecha.substring(0, 10)}</TableCell>
                <TableCell align="right">{row.vencimiento.substring(0, 10)}</TableCell>
                <TableCell align="right">{row.numero}</TableCell>
                <TableCell align="right">{this.props.proveedores[row.proveedor].nombre}</TableCell>
                <TableCell align="right">{'$' + row.monto + ' ' + row.currency}</TableCell>
                <TableCell align="right">{row.detalle}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      </div>
    )
  }
}



