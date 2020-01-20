import React from 'react'
import './Facturas.css';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

const columns = [
  { id: 'id', label: 'ID', minWidth: 30 },
  { id: 'fecha', label: 'Fecha', minWidth: 30, format: "Date" },
  { id: 'vencimiento', label: 'Vencimiento', minWidth: 30, format: "Date" },
  { id: 'numero', label: 'N° Factura', minWidth: 30 },
  {
    id: 'monto',
    label: 'Monto',
    minWidth: 50,
    align: 'right',
  },
  { id: 'currency', label: 'Currency', minWidth: 40 },
  { id: 'symbol_currency', label: 'Symbol Currency', minWidth: 40 },
  { id: 'detalle', label: 'Detalle', minWidth: 40 },
  { id: 'empresa', label: 'Empresa', minWidth: 40 },
  {
    id: 'proveedor_name',
    label: 'Proveedor',
    minWidth: 70,
    align: 'right',
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 70,
    align: 'right',
    format: value => value.toFixed(2),
  },
  {
    id: 'Acciones',
    label: 'Acciones',
    minWidth: 170,
    align: 'right',
    format: "button",
  },
];

export default function StickyHeadTable(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getDateFormat = (fecha) => {
    return fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate()
  }

  return (
      <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
            {columns.map(column => (
              <TableCell
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth }}
              >
                {column.label}
              </TableCell>
            ))}
            </TableRow>
          </TableHead>
          <TableBody>
          {props.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                {columns.map(column => {
                  const value = row[column.id];
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {column.format === 'Date' ? getDateFormat(new Date (parseInt(value))) : value}
                      {column.format === 'button' ? (
                        <div>
                          <Button variant="contained" color="primary" className={classes.buttons} href={"/facturas/" + row.id}>Ver</Button>
                          <Button variant="contained" color="default" className={classes.buttons}>Editar</Button>
                          <Button variant="contained" color="secondary"className={classes.buttons}>Eliminar</Button>
                        </div>
                      ) : null}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={props.rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
    );
  }

// export default withStyles(useStyles)(tablaFacturas);