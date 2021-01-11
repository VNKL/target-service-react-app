import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grow from "@material-ui/core/Grow";
import TableContainer from '@material-ui/core/TableContainer';


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});


const CabinetsTable = (props) => {
    const classes = useStyles();
    const {data} = props


    return (
        <Grow in>
            <TableContainer component={Paper}>
                <Paper elevation={5}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Тип</TableCell>
                                <TableCell align='center'>Кабинет</TableCell>
                                <TableCell align='center'>Ссылка на кабинет</TableCell>
                                <TableCell align='center'>Клиент</TableCell>
                                <TableCell align='center'>Ссылка на клиента</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((item, idx) => (
                                <TableRow key={idx}>
                                    <TableCell component="th" scope="row">
                                        {item.cabinetType}
                                    </TableCell>
                                    <TableCell align='center'>{item.cabinetName}</TableCell>
                                    <TableCell align='center'>{item.cabinetLink}</TableCell>
                                    <TableCell align='center'>{item.clientName}</TableCell>
                                    <TableCell align='center'>{item.clientLink}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </TableContainer>
        </Grow>
    );
}

export default CabinetsTable