import React, { useState ,useEffect} from 'react';
import useStyles from '../../styles';

import { Link } from "react-router-dom";
import clsx from 'clsx';
import { useCountContext } from '../../utils/GlobalState';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AppsIcon from '@material-ui/icons/Apps';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import Avatar from '@material-ui/core/Avatar';

import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import gapi from 'gapi-client';
import DrawerLeft from '../DrawerLeft';
import DrawerRight from '../DrawerRight';
function Index() {
    useEffect(()=>{
       if(localStorage.getItem('token')){
           dispatch({
               type:"login",
               username:localStorage.getItem('username')
           })
       }

    },[])
    const [state, dispatch] = useCountContext();
    const [inputSearch, setInputSearch] = useState('');
    const classes = useStyles();

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

    const handleDrawerLeftOpen = () => {
        dispatch({
            type: "open"
        })
    };
    const handleDrawerRightOpen = () => {
        dispatch({
            type: "openRight"
        })
    };
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: state.openLeft,
                })}
            >
                <Toolbar className={classes.toolBar}>
                    <IconButton
                        color="black"
                        aria-label="open drawer"
                        onClick={handleDrawerLeftOpen}
                        // edge="start"
                        className={classes.menuIcon}
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
                        />
                        <Link to={`/search/${inputSearch}`}
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
                            aria-haspopup="true"
                            onClick={handleDrawerRightOpen}
                            color="inherit"
                        >
                            <Avatar />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            <DrawerLeft/>
            <DrawerRight/>
        </div>
    )
}

export default Index
