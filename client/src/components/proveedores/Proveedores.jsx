import React, { Component } from 'react'
import  { Redirect } from 'react-router-dom'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
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
            deleting: false,
            nuevoProveedor: '',
            redirect: false,
            messageErrors: []
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
        if (response.ok) {
            const json = await response.json();
            console.log(json)
            this.setState({ proveedores: json.data, proveedoresLoaded: true});
            this.setState({redirect :false})
        } else {
            this.props.logout()
        }
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }
    
    async createNew(){
        this.setState({creating:true})
        console.log('Bearer ' + this.props.user.token)
        const body = {name: this.state.nuevoProveedor}
        const response = await fetch('/api/proveedores', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: new Headers({
                'Authorization': 'Bearer ' + this.props.user.token, 
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
        }
        );
        if (response.ok) {
            const json = await response.json();
            let proveedores = this.state.proveedores
            proveedores.push({id: json.proveedor.id, name: this.state.nuevoProveedor})
            this.setState({proveedores:proveedores, nuevoProveedor: ''})
            this.setState({creating:false})
            this.setState({messageErrors: []})
        } else {
            response.json().then(resp => {
                resp.message.map((messages) => {
                    let messageErrors = []
                    Object.values(messages).forEach(value => {
                        messageErrors.push(value)
                        this.setState({messageErrors: messageErrors, creating: false})
                    })
                })
            })
        }
    }

    async delete(id){
        if (!this.state.deleting){
            this.setState({deleting:true})
            const response = await fetch('/api/proveedores/'+id, {
                method: 'DELETE',
                headers: new Headers({
                    'Authorization': 'Bearer ' + this.props.user.token, 
                    'Content-Type': 'application/json'
                })
            }
            );
            const json = await response.json();
            let proveedores = this.state.proveedores
            proveedores = proveedores.filter(prov => prov.id != id);
            this.setState({proveedores:proveedores})
            this.setState({deleting:false})
        }
        
    }

    render() {
        let messageErrors = this.state.messageErrors.length > 0 ? ( this.state.messageErrors.map((message, i) => {
            return <Typography key={i} color="error" component="h1" variant="h3" align="center">{message}</Typography> })) : null
        return (
            <div>
            {messageErrors}
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
                        <List >
                            {this.state.proveedores.map(prov => {
                                return <ListItem key={prov.id}>
                                <ListItemAvatar>
                                    <Avatar>
                                    <BusinessIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={prov.name}
                                />
                                <ListItemSecondaryAction onClick={() => this.delete(prov.id)}>
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
