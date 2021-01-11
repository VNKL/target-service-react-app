import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import StopIcon from '@material-ui/icons/Stop';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Avatar from "@material-ui/core/Avatar";
import Grow from "@material-ui/core/Grow";


const icons = [

    <Tooltip title='Остановлено'>
        <TableCell align="right">
            <StopIcon color='secondary' />
        </TableCell>
    </Tooltip>,

    <Tooltip title='Запущено'>
        <TableCell align="right">
            <PlayArrowIcon color='secondary'/>
        </TableCell>
    </Tooltip>,

    <Tooltip title='Удалено'>
        <TableCell align="right">
            <DeleteIcon color='secondary'/>
        </TableCell>
    </Tooltip>,

    <Tooltip title='Приостановлено'>
        <TableCell align="right">
            <PauseIcon color='secondary'/>
        </TableCell>
    </Tooltip>,

]


const getHeadCells = (firstCellLabel) => {
    const cells = []
    if (firstCellLabel === 'Релиз') {
        cells.push({ id: 'cover', numeric: false, label: '', tooltip: '' },)
    }
    cells.push(
        { id: 'name', numeric: false, label: firstCellLabel, tooltip: '' },
        { id: 'status', numeric: true, label: 'Статус', tooltip: '' },
        { id: 'spent', numeric: true,  label: 'Потрачено', tooltip: 'Потраченная сумма в рублях' },
        { id: 'reach', numeric: true,  label: 'Показы', tooltip: '' },
        { id: 'listens', numeric: true,  label: 'Прослушивания', tooltip: '' },
        { id: 'clicks', numeric: true, label: 'Переходы', tooltip: '' },
        { id: 'subscribes', numeric: true, label: 'Подписки', tooltip: '' },
        { id: 'cpl', numeric: true, label: 'CPL', tooltip: 'Cost Per Listen - стоимость одного прослушивания в рублях' },
        { id: 'cpc', numeric: true, label: 'CPC', tooltip: 'Cost Per Click - стоимость одного перехода в рублях' },
        { id: 'cps', numeric: true, label: 'CPS', tooltip: 'Cost Per Subscribe - стоимость одной подписки в рублях' },
        { id: 'cpm', numeric: true, label: 'CPM', tooltip: 'Стоимость тысячи показов в рублях' },
    )

    return cells
}

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
    const { classes, order, orderBy, onRequestSort, firstCellLabel } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    const headCells = getHeadCells(firstCellLabel)

    return (
        <TableHead>
            <TableRow >
                {headCells.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align={headCell.numeric ? 'right' : 'left'}
                            padding={headCell.disablePadding ? 'none' : 'default'}
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <Tooltip title={headCell.tooltip} >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <span className={classes.visuallyHidden}>
                                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </span>
                                ) : null}
                            </TableSortLabel>
                            </Tooltip>
                        </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
}));

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected, headLabel } = props;

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {numSelected} выбрано
                </Typography>
            ) : (
                <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                    {headLabel}
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton aria-label="filter list">
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));


const TableView = (props) => {

    const {data, firstCellLabel, headLabel} = props
    let startDense = false
    let startRrowsPerPage = 5
    if (headLabel === 'Объявления') {
        startDense = true
        startRrowsPerPage = 10
    }

    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('name');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(startDense);
    const [rowsPerPage, setRowsPerPage] = React.useState(startRrowsPerPage);

    const coverSize = dense ? {width: 30, height: 30} : {width: 50, height: 50}

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = data.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (campaignVkId) => {
        if (campaignVkId) {
            window.location = `/ads/${campaignVkId}`
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
        <div className={classes.root}>
            <Grow in>
                <Paper className={classes.paper} elevation={5}>
                    <EnhancedTableToolbar numSelected={selected.length} headLabel={headLabel}/>
                    <TableContainer>
                        <Table
                            className={classes.table}
                            aria-labelledby="tableTitle"
                            size={dense ? 'small' : 'medium'}
                            aria-label="enhanced table"
                        >
                            <EnhancedTableHead
                                classes={classes}
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={data.length}
                                firstCellLabel={firstCellLabel}
                            />
                            <TableBody>
                                {stableSort(data, getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        const isItemSelected = isSelected(row.name);
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        let handleCampaignClick = undefined
                                        let handleCursorHover = undefined
                                        if (row.campaignVkId) {
                                            handleCampaignClick = () => {handleClick(row.campaignVkId)}
                                            handleCursorHover = {cursor: 'pointer'}
                                        }
                                        let icon = icons[row.status]
                                        if (row.approved === 3) {
                                            icon = icons[3]
                                        }
                                        let firstCells = (
                                            <TableCell component="th" scope="row" id={labelId} align='left' padding='default'>
                                                {row.name}
                                            </TableCell>
                                        )
                                        if (row.cover) {
                                            firstCells = (
                                                <React.Fragment >
                                                    <TableCell component="th" scope="row" id={labelId} align='left'>
                                                        <Avatar src={row.cover} alt='cover' style={coverSize} />
                                                    </TableCell>
                                                    <TableCell align='left'>
                                                        {row.name}
                                                    </TableCell>
                                                </React.Fragment>
                                            )
                                        }

                                        return (
                                            <TableRow
                                                hover
                                                onClick={handleCampaignClick}
                                                style={handleCursorHover}
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={index}
                                                selected={isItemSelected}
                                            >
                                                { firstCells }
                                                { icon }
                                                <TableCell align="right">{row.spent}</TableCell>
                                                <TableCell align="right">{row.reach}</TableCell>
                                                <TableCell align="right">{row.listens}</TableCell>
                                                <TableCell align="right">{row.clicks}</TableCell>
                                                <TableCell align="right">{row.subscribes}</TableCell>
                                                <TableCell align="right">{row.cpl}</TableCell>
                                                <TableCell align="right">{row.cpc}</TableCell>
                                                <TableCell align="right">{row.cps}</TableCell>
                                                <TableCell align="right">{row.cpm}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Paper>
            </Grow>

            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label='Компактный вид'
            />
        </div>
    );
}

export default TableView