import React, { useState } from 'react';
import useStyles from '../../styles';
import axios from 'axios';

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
import Collapse from '@material-ui/core/Collapse';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import InputBase from '@material-ui/core/InputBase';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import gapi from 'gapi-client';

function Index() {
    
    const classes = useStyles();
    const [state, dispatch] = useCountContext();
    const [formInput, setFormInput] = useState({});  
    const handleFormInput = (event) => {
        const { name, value } = event.target;
        setFormInput({ ...formInput, [name]: value })
    }
    const handleSignup=()=>{
        axios.post("http://localhost:8000/rest-auth/registration/", {
            username: formInput.username,
            email:formInput.email,
            password1: formInput.password1,
            password2: formInput.password2
        })
            .then(res => {
                const token = res.data.key;
                console.log('login successful ', res.data);
                localStorage.setItem('token', token);
                localStorage.setItem('username',formInput.username)
                dispatch({
                    type: "login",
                    username: formInput.username
                })
            })
    }
    return (
        <div>
            <ListItem className="drawerList" button >
                <InputBase
                    value={formInput.username}
                    name="username"
                    onChange={handleFormInput}
                    placeholder="username"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'username' }}
                />
            </ListItem>
            <ListItem className="drawerList" button >
                <InputBase
                    value={formInput.password}
                    name="email"
                    onChange={handleFormInput}
                    placeholder="email"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'password' }}
                />
            </ListItem>
            <ListItem className="drawerList" button >
                <InputBase
                    value={formInput.password}
                    name="password1"
                    onChange={handleFormInput}
                    placeholder="password"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'password' }}
                />
            </ListItem>
            <ListItem className="drawerList" button >
                <InputBase
                    value={formInput.password}
                    name="password2"
                    onChange={handleFormInput}
                    placeholder="password"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'password' }}
                />
            </ListItem>
            <ListItem className="drawerList" button >
                <IconButton onClick={handleSignup}>Sign up
                                 <ExitToAppIcon />
                </IconButton>
            </ListItem>
        </div>
    )
}

export default Index
