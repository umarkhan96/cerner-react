import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {connect} from 'react-redux'
import { update_user } from '../../config/store/action';
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: "#fff",
    padding: 20,
    boxShadow: '0 8px 6px -6px grey',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#1896d2',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0, 1.2),
    // marginTop:10,
    backgroundColor: "#1896d2",
    color: "#fff",
    fontFamily: "Poppins"
  },
}));

const SignIn = React.memo((props) => {
  const classes = useStyles();

  return (<div className={'formContainer'}>
    <Container component="main" maxWidth="xs" style={{ backgroundColor: "#000", borderRadius: 20 }}>
      <CssBaseline />
      <div className={classes.paper}>

        <div>
          <img src={require('../../assets/images/logo.png')} style={{ width: 120 }} />
        </div>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <form className={classes.form} noValidate action={"JavaScript:void(0)"}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
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
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="#1896d2" style={{ color: "#1896d2" }} />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="default"
            className={classes.submit}
            onClick={() => {
              props.store_user(true)
              props.history.push('/home')
             }}
          >
            Sign In
          </Button>
          <div className={'formFooter'}>
            <p className={'formText'}>Forgot password?</p>
            <p className={'formText'} onClick={() => {
              props.history.push('/signup')
            }}>Don't have an account? Sign Up</p>
          </div>
        </form>
      </div>
    </Container>
  </div>
  );
})

const mapDispatchToProps = dispatch => {
  return {
      store_user: (user) => dispatch(update_user(user))
  }
}

export default connect(null,mapDispatchToProps)(SignIn)
