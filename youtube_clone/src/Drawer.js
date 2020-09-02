import React, { useState } from 'react';
import useStyles from './styles';

import { Link } from "react-router-dom";
import clsx from 'clsx';
import { useCountContext } from './utils/GlobalState'
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import AppsIcon from '@material-ui/icons/Apps';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import Avatar from '@material-ui/core/Avatar';

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
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import gapi from 'gapi-client';


export default function PersistentDrawerLeft() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const [state, dispatch] = useCountContext();
    const handleSearch = () => {
        return gapi.client.youtube.search.list({
            "part": [
                "snippet"
            ],
            "maxResults": 25,
            "q": inputSearch
        })
            .then(function (response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response.result);
                dispatch({
                    type: "result",
                    result: response.result.items,
                })
            },
                function (err) { console.error("Execute error", err); });

    }

    const handleDrawerOpen = () => {
        setOpen(true);
        dispatch({
            type: "open"
        })
        console.log(open)
    };

    const handleDrawerClose = () => {
        setOpen(false);
        dispatch({
            type: "close"
        })

    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };
    const [inputSearch, setInputSearch] = useState('');

    const menuId = 'primary-search-account-menu';
    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );
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
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar className={classes.toolBar}>
                    <IconButton
                        color="black"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Link className={classes.linkComponent} to="/">
                        <img
                            className="header__logo"
                            src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Logo_of_YouTube_%282015-2017%29.svg"
                            alt=""
                        />
                    </Link>
                    {/* <Typography className={classes.title} variant="h6" noWrap>
                        YouTube Clone
                    </Typography> */}
                    <div className={classes.grow} />
                    <div className={classes.search}>

                        <InputBase
                            value={inputSearch}
                            onChange={e => setInputSearch(e.target.value)}
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        /><Link to={`/search/${inputSearch}`}
                            className={classes.search_Icon}
                            onClick={handleSearch}
                        >
                            <SearchIcon />
                        </Link>
                    </div>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <IconButton aria-label="new video" color="black">
                            <VideoCallIcon />
                        </IconButton>
                        <IconButton aria-label="apps" color="black">
                            <AppsIcon />
                        </IconButton>
                        <IconButton aria-label="show 17 new notifications" color="black">
                            <Badge badgeContent={7} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <Avatar />
                        </IconButton>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
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

            {renderMenu}
        </div>
    );
}
