import React, { Component } from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { CircularProgress } from '@material-ui/core';
import {
    Redirect,
  } from "react-router-dom";

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class Login extends Component {
    
    state = { 
        email: '',
        password: '',
        onSubmit: false,
        redirect: false,
        errorMessages: null
    };

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.setState({onSubmit: true});
        fetch('/api/user_token', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password
                }),
              }).then(response => {
                  if (response.ok) {
                      response.json().then(values => {
                        this.props.signIn(values)
                        this.setState({redirect: true})
                      })
                  } else {
                      response.json().then(values => {
                          if (!Array.isArray(values.message)){
                            this.setState({onSubmit: false, errorMessages: values.message});
                          }else {
                            this.setState({onSubmit: false});
                          }
                      })
                  }
              }).catch(err => {
                this.setState({onSubmit: false});
              });
    }

    render() {
        const { classes } = this.props;
        let loginButton = this.state.onSubmit? 
        <div style={{display: 'flex', justifyContent: 'center'}}>
           <CircularProgress />
        </div>
        :
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={this.onSubmit}
            >
            Sign In
        </Button>
        let redirect = this.state.redirect ? 
        <Redirect
              to={{
                pathname: "/"
              }}
        />
        :
        <p></p>
        let err = this.state.errorMessages === null ? null : <Typography component="h1" variant="h5">{this.state.errorMessages}</Typography>
        return (
            <div>
                <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    {redirect}
                    <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                    Sign in
                    </Typography>
                    {err}
                    <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        autoComplete="current-password"
                    />
                    {loginButton}
                    <Grid container>
                        <Grid item xs>
                        <Link href="#" variant="body2">
                            Forgot password?
                        </Link>
                        </Grid>
                        <Grid item>
                        <Link href="#" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                        </Grid>
                    </Grid>
                    </form>
                </div>
                </Container>
            </div>
        )
    }
}

export default withStyles(styles)(Login);
