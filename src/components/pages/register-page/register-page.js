import React, {useState} from 'react';
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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


const tryToRegister = async (changeLoggedInStatus, setRegisterError,
                             setUsernameError, setPasswordError,
                             setRealnameError, setEmailError) => {
    const api = new ApiService()
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    const realname = document.getElementById('realname').value
    const email = document.getElementById('email').value

    if (username === '') {setUsernameError(true)} else {setUsernameError(false)}
    if (password === '') {setPasswordError(true)} else {setPasswordError(false)}
    if (realname === '') {setRealnameError(true)} else {setRealnameError(false)}
    if (email === '') {setEmailError(true)} else {setEmailError(false)}

    if (username && password && realname && email) {
        const resp = await api.register(username, password, realname, email)

        if (typeof resp !== 'undefined') {
            changeLoggedInStatus(true)
            localStorage.setItem('token', resp.token)
            window.location.href ='/'
        } else {
            document.getElementById('form').reset()
            setUsernameError(false)
            setPasswordError(false)
            setRealnameError(false)
            setEmailError(false)
            setRegisterError(true)
        }
    }
}


const RegisterPage = (props) => {
    const classes = useStyles();
    const {changeLoggedInStatus} = props

    const [registerError, setRegisterError] = useState(false)
    const [usernameError, setUsernameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [realnameError, setRealnameError] = useState(false)
    const [emailError, setEmailError] = useState(false)

    const registerErrorIndicator = registerError ? <Typography color='error'>Ошибка регистрации</Typography> : undefined

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>

                <Typography component="h1" variant="h5">
                    Регистрация
                </Typography>

                {registerErrorIndicator}

                <form className={classes.form} id='form' noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={realnameError}
                                autoComplete="rname"
                                name="realname"
                                variant="outlined"
                                required
                                fullWidth
                                id="realname"
                                label="Имя"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={usernameError}
                                variant="outlined"
                                required
                                fullWidth
                                id="username"
                                label="Логин"
                                name="username"
                                autoComplete="uname"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={emailError}
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={passwordError}
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Пароль"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="Хочу получать информацию об обновлениях, акциях и других предложениях на почту"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        // type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => tryToRegister(changeLoggedInStatus, setRegisterError,
                                                     setUsernameError, setPasswordError,
                                                     setRealnameError, setEmailError)}
                    >
                        Зарегистрироваться
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link component={RouterLink} to='/login' variant="body2">
                                Уже есть аккаунт? Войди
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}

export default RegisterPage