import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Paper, Tabs, Tab } from '@material-ui/core';



export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <AppBar position="static">
                        {this.props.user.isLoggedIn ? 
                        <div>
                        <Tab label="Home" href="/" />
                        <Tab label="Proveedores" href="/proveedores" />
                        <Tab label="Empresas" href="/empresas" />
                        <Tab label="" to="/" disabled/>
                        <Tab label="" to="/" disabled/>
                        <Tab label="" to="/" disabled/>
                        <Tab label="" to="/" disabled/>
                        <Tab label="" to="/" disabled/>
                        <Tab label="" to="/" disabled/>
                        <Tab label="" to="/" disabled/>
                        <Tab label="" to="/" disabled/>
                        <Tab label="Logout" style={{margintLeft: '90%'}} onClick={this.props.logout}/>
                        </div>
                        :<div></div>
                        }
                </AppBar>

            </div>
        )
    }
}