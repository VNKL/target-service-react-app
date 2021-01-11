import Typography from "@material-ui/core/Typography";
import {Paper} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Grow from "@material-ui/core/Grow";


const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            padding: theme.spacing(3),
        },
    },
}));


const CabinetsHelpBlock = () => {

    const classes = useStyles()

    return (
        <Grow in>
            <Paper className={classes.paper} elevation={5}>
                <Typography component='span' variant='caption'>
                    <p>
                        Поскольку кабинеты у пользователей изменяются не часто, для ускорения работы ПО информация о
                        кабинетах сохраняется в базе данных и используется оттуда без обращений к серверам ВК.
                    </p>
                    <p>
                        Поэтому, если в твоем доступе появились новые кабинеты или у тебя больше нет доступа к сохраненным
                        ранее кабинетам, не забудь обновить информацию, нажав на кнопку выше.
                    </p>
                    <p>
                        <b>Внимание! </b>
                        Обновление кабинетов приводит к удалению сохраненных ранее в ПО баз ретаргета.
                        После обновления кабинетов не забудь обновить ретаргет.
                    </p>
                </Typography>
            </Paper>
        </Grow>
    )
}

export default CabinetsHelpBlock