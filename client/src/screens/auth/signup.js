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
import { FaUserMd } from 'react-icons/fa';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(3.5),
        marginBottom: theme.spacing(3.5),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: "#fff",
        padding: 20,
        boxShadow: '0 8px 6px -6px grey',
    },
    avatar: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1.5),

        backgroundColor: '#1896d2',
    },
    form: {
        width: '100%',
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

const Signup = React.memo((props) => {
    const classes = useStyles();

    return (<div className={'formContainer'}>
        <Container component="main" maxWidth="sm" style={{ backgroundColor: "#000", borderRadius: 20 }}>
            <CssBaseline />
            <div className={classes.paper}>
                <div>
                    <img src={require('../../assets/images/logo.png')} style={{ width: 120 }} />
                </div>
                <Avatar className={classes.avatar}>
                    <FaUserMd />
                </Avatar>
                <form className={classes.form} noValidate action={"JavaScript:void(0)"}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="fullName"
                                variant="outlined"
                                required
                                fullWidth
                                id="fullName"
                                label="Full Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="userName"
                                label="User Name"
                                name="userName"
                                autoComplete="uname"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="designation"
                                label="Designation"
                                name="designation"
                                autoComplete="designation"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="default"
                        className={classes.submit}
                    >
                        Sign Up
          </Button>
                    <div className={'formFooter'}>
                        <p className={'formText'} onClick={() => { props.history.push('/login') }}>Already have an account? Sign in</p>
                    </div>
                </form>
            </div>
        </Container>
    </div>
    );
})

export default Signup