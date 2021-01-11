import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grow from "@material-ui/core/Grow";


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});


const RetargetTable = (props) => {
    const classes = useStyles();
    const {data} = props


    return (
        <Grow in>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Название</TableCell>
                            <TableCell align='right'>Размер аудитории</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item, idx) => (
                            <TableRow key={idx}>
                                <TableCell component="th" scope="row">
                                    {item.retargetName}
                                </TableCell>
                                <TableCell align='right'>{item.audienceCount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grow>
    );
}

export default RetargetTable