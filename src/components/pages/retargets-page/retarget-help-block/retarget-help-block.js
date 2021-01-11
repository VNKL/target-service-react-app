import Typography from "@material-ui/core/Typography";
import {Paper} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Grow from '@material-ui/core/Grow';


const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            padding: theme.spacing(3),
        },
    },
}));


const RetargetHelpBlock = () => {

    const classes = useStyles()

    return (
        <Grow in>
            <Paper className={classes.paper} elevation={5}>
                <Typography component='span' variant='caption'>
                    <p>
                        Для ускорения работы ПО информация о базах ретаргета сохраняется в базе данных и используется
                        оттуда без обращений к серверам ВК.
                    </p>
                    <p>
                        Поэтому, если в одном или нескольких твоих кабинетах добавились новые или удалились старые базы
                        ретаргета, не забудь обновить информацию о них по кнопке выше.
                    </p>
                    <p>
                        <b>Внимание! </b>
                        Обновление кабинетов приводит к удалению сохраненных ранее в ПО баз ретаргет.
                        После обновления кабинетов не забудь обновить ретаргет.
                    </p>
                </Typography>
            </Paper>
        </Grow>
    )
}

export default RetargetHelpBlock