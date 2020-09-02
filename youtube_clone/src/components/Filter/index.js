import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TuneIcon from '@material-ui/icons/Tune';
import { useCountContext } from "../../utils/GlobalState";
import { ListItem } from '@material-ui/core';

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'none',
        },

    },
    table: {
        marginBottom: "20px",
        border: "none",
        width: "70%",
        marginLeft: "-20px",
        paddingLeft: 0,
        backgroundColor: "#f9f9f9",
        boxShadow: "none",
    }
});

function createData(upload, type, duration, features, sort) {
    return {
        upload,
        type,
        duration,
        features,
        sort,
    };
}

function Row(props) {
    const [state, dispatch] = useCountContext();
    const handleFilter = (event) => {
        const targetName = event.target.getAttribute('name');
        if (state.hasResult) {
            let filterResult;
            switch (targetName) {
                case "Last hour":
                    filterResult = state.result.filter(item => Math.abs((new Date(item.snippet.publishedAt)) - (new Date())) / 36e5 <= 1);
                    console.log(filterResult, targetName)
                    dispatch({
                        type: "result",
                        result: filterResult,
                    })
                    break

                case "Today":
                    filterResult = state.result.filter(item => Math.abs((new Date(item.snippet.publishedAt)) - (new Date())) / 36e5 <= 24);
                    console.log(filterResult,targetName)
                    dispatch({
                        type: "result",
                        result: filterResult,
                    })
                    break

                case "This week":
                    filterResult = state.result.filter(item => Math.abs((new Date(item.snippet.publishedAt)) - (new Date())) / 36e5 <= 168);
                    console.log(filterResult,targetName)
                    dispatch({
                        type: "result",
                        result: filterResult,
                    })
                    break

                case "This month":
                    filterResult = state.result.filter(item => Math.abs((new Date(item.snippet.publishedAt)) - (new Date())) / 36e5 <= 720);
                    console.log(filterResult,targetName)
                    dispatch({
                        type: "result",
                        result: filterResult,
                    })
                    break

                case "This year":
                    filterResult = state.result.filter(item => Math.abs((new Date(item.snippet.publishedAt)) - (new Date())) / 36e5 <= 8736);
                    console.log(filterResult,targetName)
                    dispatch({
                        type: "result",
                        result: filterResult,
                    })
                    break

            }
            // console.log(filterResult);
            // dispatch({
            //     type: "result",
            //     result: filterResult,
            // })

        } else { console.log("no result") }
    }
    const { row } = props;
    return (
        <React.Fragment>
            <TableRow>
                <TableCell  ><ListItem button onClick={handleFilter} value="upload" name={row.upload}>{row.upload}</ListItem> </TableCell>
                <TableCell onClick={handleFilter} value="type" name={row.type}>{row.type} </TableCell>
                <TableCell onClick={handleFilter} value="duration" name={row.duration}>{row.duration} </TableCell>
                <TableCell onClick={handleFilter} value="features" name={row.features}>{row.features} </TableCell>
                <TableCell onClick={handleFilter} value="sort" name={row.sort}>{row.sort} </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

const rows = [
    createData("Last hour", "Video", "Short(<4 minutes)", "Live", "Relevance"),
    createData("Today", "Channel", "Long (>20 minutes)", "4K", "Upload date"),
    createData("This week", "Playlist", "", "HD", "View count"),
    createData("This month", "Film", "", "Subtitles/CC", "Rating"),
    createData("This year", "Programme", "", "Creative Commons", ""),
    createData("", "", "", "360", ""),
    createData("", "", "", "VR180", ""),
    createData("", "", "", "3D", ""),
    createData("", "", "", "HDR", ""),
    createData("", "", "", "Location", ""),
    createData("", "", "", "Purchased", ""),
];

export default function CollapsibleTable() {
    const classes = useRowStyles();
    const [open, setOpen] = React.useState(false);
    return (
        <Table className={classes.table} aria-label="collapsible table">
            <TableRow >
                <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                    {/* {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />} */}
                    <div className="searchPage__filter">
                        <TuneIcon />
                        <h2>FILTER</h2>
                    </div>
                </IconButton>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>UPLOAD DATE</TableCell>
                                        <TableCell>TYPE</TableCell>
                                        <TableCell>DURATION</TableCell>
                                        <TableCell>FEATURES</TableCell>
                                        <TableCell>SORT BY</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row, index) => (
                                        <Row key={index} row={row} />
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Table>
    );
}
