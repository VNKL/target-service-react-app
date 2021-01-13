import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {makeStyles} from "@material-ui/core/styles";
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';


const useStyles = makeStyles(() => ({
    userMenu: {
        color: 'white'
    }
}));


const logOut = () => {
    localStorage.removeItem('token');
    window.location.reload()
}


export default function UserMenu() {

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>

            <Button className={classes.userMenu}
                    aria-controls="user-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
            >
                Настройки
            </Button>

            <Menu
                id="user-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <Link component={RouterLink} to='/user_profile' color='textPrimary' underline='none'>
                    <MenuItem>Профиль</MenuItem>
                </Link>

                <MenuItem onClick={logOut}>Выйти</MenuItem>

            </Menu>

        </div>
    );
}
