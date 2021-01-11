import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const UserAvatarImage = (props) => {
    const classes = useStyles();

    const {user} = props

    return (
        <div className={classes.root}>
            <Avatar alt={user.username} src={user.avatarImageUrl} />
        </div>
    );
}

export default UserAvatarImage