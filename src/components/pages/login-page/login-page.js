import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ApiService from "../../../services/api-service";
import { Link as RouterLink } from 'react-router-dom';


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


const useStyles = makeStyles((theme) => ({
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
}));


const tryToLogin = async (changeLoggedInStatus, setLoginError, setLoginValueError, setPasswordValueError) => {
    const api = new ApiService()
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value

    if (username === '') {setLoginValueError(true)} else {setLoginValueError(false)}
    if (password === '') {setPasswordValueError(true)} else {setPasswordValueError(false)}

    if (username && password) {
        const resp = await api.login(username, password)
        if (typeof resp !== 'undefined') {
            changeLoggedInStatus(true)
            localStorage.setItem('token', resp.token)
            window.location.href ='/'
        } else {
            document.getElementById('form').reset()
            setLoginValueError(false)
            setPasswordValueError(false)
            setLoginError(true)
        }
    }
}


const LoginPage = (props) => {
    const classes = useStyles();
    const {changeLoggedInStatus} = props

    const [passwordValueError, setPasswordValueError] = useState(false)
    const [loginError, setLoginError] = useState(false)
    const [loginValueError, setLoginValueError] = useState(false)

    const loginErrorIndicator = loginError ? <Typography color='error'>Неверный логин или пароль</Typography> : undefined

    const onEnterPress = (event) => {
        if(event.keyCode === 13 && event.shiftKey === false) {
            event.preventDefault();
            tryToLogin(changeLoggedInStatus, setLoginError, setLoginValueError, setPasswordValueError);
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>

                <Typography component="h1" variant="h5">
                    Вход
                </Typography>

                {loginErrorIndicator}

                <form className={classes.form} id='form'
                      noValidate
                      onKeyDown={onEnterPress}>
                    <TextField
                        error={loginValueError}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Логин"
                        name="username"
                        autoComplete="username"
                        autoFocus
                    />
                    <TextField
                        error={passwordValueError}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Пароль"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    {/*<FormControlLabel*/}
                    {/*    control={<Checkbox value="remember" color="primary" />}*/}
                    {/*    label="Remember me"*/}
                    {/*/>*/}
                    <Button
                        // type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => tryToLogin(changeLoggedInStatus, setLoginError,
                                                  setLoginValueError, setPasswordValueError)}
                    >
                        Войти
                    </Button>

                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Не помнишь пароль?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link component={RouterLink} to='/register' variant="body2">
                                {"Нет аккаунта? Зарегистрируйся"}
                            </Link>
                        </Grid>
                    </Grid>

                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}


export default LoginPage