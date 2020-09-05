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
//helper function to quickly populate a table
function createData(upload, type, duration, features, sort) {
    return {
        upload,
        type,
        duration,
        features,
        sort,
    };
}
//create talbe "rows" to be injected into Row class later
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

function Row(props) {
    const [state, dispatch] = useCountContext();
    //only including logic for date related filtering, for demonstration only
    const handleFilter = (event) => {
        const targetName = event.target.getAttribute('name');
        if (state.hasResult) {
            const calHour=(hour)=>{
                // calculating the number of hours between now and the timestamp
               const filterResult=state.result.filter(item => Math.abs((new Date(item.snippet.publishedAt)) - (new Date())) / 36e5 <= hour);
                dispatch({
                    type: "result",
                    result: filterResult,
                });
            }
            switch (targetName) {
                case "Last hour":
                    calHour(1);
                    break
                case "Today":
                    calHour(24);
                    break
                case "This week":
                    calHour(169);
                    break
                case "This month":
                    calHour(720);
                    break
                case "This year":
                    calHour(8736);
                    break
            }
        } else { console.log("no result") }
    }
    const { row } = props;
    return (
        <React.Fragment>
            <TableRow>
                <TableCell  ><ListItem button onClick={handleFilter} value="upload" name={row.upload}>{row.upload}</ListItem> </TableCell>
                {/* no other tableCell has filter function, due to limited data from the API */}
                <TableCell  value="type" name={row.type}>{row.type} </TableCell> 
                <TableCell  value="duration" name={row.duration}>{row.duration} </TableCell>
                <TableCell  value="features" name={row.features}>{row.features} </TableCell>
                <TableCell  value="sort" name={row.sort}>{row.sort} </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function CollapsibleTable() {
    const classes = useRowStyles();
    //useState to control the conllapse state of Collapse component
    const [open, setOpen] = React.useState(false);
    return (
        <Table className={classes.table} aria-label="collapsible table">
            <TableRow >
                <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
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
