import React, { useState } from 'react';
import useStyles from '../../styles';

import { Link } from "react-router-dom";
import clsx from 'clsx';
import { useCountContext } from '../../utils/GlobalState';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Home from '@material-ui/icons/Home';
import Trending from '@material-ui/icons/Whatshot';
import Sub from '@material-ui/icons/Subscriptions';
import Library from '@material-ui/icons/VideoLibrary';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import HistoryIcon from '@material-ui/icons/History';
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

import InputBase from '@material-ui/core/InputBase';
import gapi from 'gapi-client';

function Index() {
    
    const classes = useStyles();
    const [state, dispatch] = useCountContext();
    const handleDrawerClose=()=>{
        dispatch({
            type:"open"
        })

    }
    const array1 = [
        {
            name: "Home",
            icon: <Home />
        },
        {
            name: "Trending",
            icon: <Trending />
        },
        {
            name: "Subscription",
            icon: <Sub />
        },
        
    ];
    const array2=[
        {
            name: "Library",
            icon: <Library />
        },
        {
            name: "History",
            icon: <HistoryIcon />
        },
        {
            name: "Your videos",
            icon: <OndemandVideoIcon />
        },
        {
            name: "Purchases",
            icon: <LocalOfferIcon />
        },
        {
            name: "Watch later",
            icon: <WatchLaterIcon />
        },
        {
            name: "Show more",
            icon: <KeyboardArrowDownIcon />
        },
    ]
    return (
        <div>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={state.status}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        <MenuIcon />
                        {/* {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />} */}
                    </IconButton>
                    <Link className={classes.linkComponent} to="/">
                        <img
                            className="header__logo"
                            src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Logo_of_YouTube_%282015-2017%29.svg"
                            alt=""
                        />
                    </Link>

                </div>
                <Divider />
                <List>
                    {array1.map((item, index) => (
                        <ListItem className="drawerList" button key={index}>
                            <ListItemIcon className="drawerIcon">{item.icon} </ListItemIcon>
                            <ListItemText primary={item.name} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {array2.map((item, index) => (
                        <ListItem className="drawerList" button key={index}>
                            <ListItemIcon className="drawerIcon">{item.icon}</ListItemIcon>
                            <ListItemText primary={item.name} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </div>
    )
}

export default Index
