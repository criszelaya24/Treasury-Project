import React, { Component } from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import BusinessIcon from '@material-ui/icons/Business';
import DeleteIcon from '@material-ui/icons/Delete';

export default class Proveedores extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            proveedores: [],
            proveedoresLoaded: false,
            creating: false,
            nuevoProveedor: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.createNew = this.createNew.bind(this);

    }
    
    componentDidMount(){
        this.getProveedores()
    }

    async getProveedores(){
        const response = await fetch('/api/proveedores', {
            headers: new Headers({
                'Authorization': 'Bearer ' + this.props.user.token, 
            })
        }
        );
        const json = await response.json();
        console.log(json)
        this.setState({ proveedores: json.data, proveedoresLoaded: true});
        console.log(this.state)
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }
    
    async createNew(){
        this.setState({creating:true})
        const body = {name: this.state.nuevoProveedor}
        console.log(JSON.stringify(body))
        const response = await fetch('/api/proveedores', {
            method: 'POST',
            headers: new Headers({
                'Authorization': 'Bearer ' + this.props.user.token, 
            }),
            body: JSON.stringify(body)
        }
        );
        const json = await response.json();
        console.log(json)
        let proveedores = this.state.proveedores
        proveedores.push(this.state.nuevoProveedor)
        this.setState({proveedores:proveedores, nuevoProveedor: ''})
        this.setState({creating:false})
    }

    render() {
        return (
            <div>
                <div className='container'>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h4" align="center">
                            Proveedores
                        </Typography>
                    </Grid>

                    <Grid item xs={4}>
                    </Grid>
                    <Grid item xs={4}>
                    <Paper >

                        <List dense={this.state.proveedores}>
                            {this.state.proveedores.map(prov => {
                                return <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                    <BusinessIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={prov.name}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="delete">
                                    <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                                </ListItem>
                            })}
                        </List>
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                    </Grid>
                    <Grid item xs={4}>
                    </Grid>
                    <Grid item xs={3}>
                        <TextField id="standard-basic" onChange={this.handleChange} label="Crear Nuevo Proveedor" name={'nuevoProveedor'} value={this.state.nuevoProveedor} fullWidth/>
                    </Grid>
                    <Grid item xs={2}>
                        {this.state.creating?
                        <CircularProgress />
                        :
                        <Fab color="primary" aria-label="add" onClick={this.createNew}>
                            <AddIcon />
                        </Fab>
                        }
                        
                    </Grid>
                </Grid>
            </div>
            </div>
        )
    }
}
