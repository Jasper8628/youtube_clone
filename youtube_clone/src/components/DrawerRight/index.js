import React, { useState } from 'react';
import { useCountContext } from '../../utils/GlobalState';
import axios from 'axios';
import Input from '@material-ui/core/Input';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import Signup from '../Signup';
import useStyles from '../../styles';

function Index() {
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const [state, dispatch] = useCountContext();
    const [formInput, setFormInput] = useState({});
    // universal form input handler, stores value with useState, based on the name property of each input field
    const handleFormInput = (event) => {
        const { name, value } = event.target;
        setFormInput({ ...formInput, [name]: value })
    }
    const handleLogin = () => {
        axios.post("http://localhost:8000/rest-auth/login/", {
            username: formInput.username,
            password: formInput.password
        })
            .then(res => {
                const token = res.data.key;
                console.log('login successful ', res.data);
                localStorage.setItem('token', token);
                localStorage.setItem('username', formInput.username)
                dispatch({
                    type: "login",
                    username: formInput.username
                })
            })
    }
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        dispatch({
            type: "logout"
        })
    }
    const handleDrawerClose = () => {
        dispatch({
            type: "openRight"
        })
    }
    const handleCollapseOpen = () => {
        setOpen(!open)
    }
    return (
        <div>
            <Drawer
                className={classes.drawerRight}
                variant="persistent"
                anchor="right"
                open={state.openRight}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        <KeyboardArrowRightIcon />
                    </IconButton>
                    {state.isAuthenticated ? (`Welcome ${state.username}!`) : ('')}
                </div>
                <Divider />
                <List>
                    {/* check global state to see if user is signed in, then only show logout button, otherwise show both log in and sign up */}
                    {!state.isAuthenticated ? (
                        <div>
                            <form >
                                <Input value={formInput.username} name="username" onChange={handleFormInput} placeholder="username" />
                                <Input value={formInput.password2} name="password" onChange={handleFormInput} type="password" placeholder="password" />
                                <IconButton onClick={handleLogin}>Log in<LockOpenIcon /></IconButton>
                            </form>
                            <ListItem className="drawerList" button onClick={handleCollapseOpen}>
                                <ListItemText primary="Sign up" />
                            </ListItem>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <Signup />
                            </Collapse>
                        </div>

                    ) : (
                            <ListItem className="drawerList" button onClick={handleCollapseOpen}>
                                <IconButton onClick={handleLogout}>Log out
                                   <LockIcon />
                                </IconButton>
                            </ListItem>
                        )}
                </List>
            </Drawer>
        </div>
    )
}

export default Index
