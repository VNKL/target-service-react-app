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


const NewAutomateHelpBlock = () => {

    const classes = useStyles()

    return (
        <Grow in>
            <Paper className={classes.paper} elevation={5}>
                <Typography component='span' variant='caption'>
                    <p>
                        <b>Кампания. </b>
                        Кампания, которую будем автоматизировать. В списке присутствуют только кампании, доступные для
                        автоматизации. При выборе кампании, которая в данный момент автоматизирована, сперва будет
                        остановлена ее текущая автоматизация.
                    </p>
                    <p>
                        <b>Цена. </b>
                        Целевая стоимость одного прослушивания релиза, к которой будет стремиться система.
                        Реальная стоимость по итогу кампании может нескольк отличаться как в бОльшую, так и в меньшую
                        стороны, но не сильно. Система останавливает объявления, стоимость прослушивания на которых
                        превышает 20% от целевой
                    </p>
                    <p>
                        <b>Запуск автоматизации. </b>
                        Активируй, если хочешь, чтобы автоматизация кампании запустилась сама завтра в 00:00.
                        Оставь деактивированным, если хочешь запустить автоматизацию прямо сейчас.
                    </p>
                    <p>
                        <b>Остановка автоматизации. </b>
                        Активируй, если хочешь, чтобы автоматизация кампании остановилась в 23:59 того дня, в который
                        была запущена. Все объявления выбранной кампании при этом также остановятся.
                        Оставь деактивированным, если хочешь остановить автоматизацию вручную.
                    </p>
                </Typography>
            </Paper>
        </Grow>
    )
}

export default NewAutomateHelpBlock