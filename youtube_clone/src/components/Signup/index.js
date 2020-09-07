import React, { useState } from 'react';
import useStyles from '../../styles';
import axios from 'axios';
import { useCountContext } from '../../utils/GlobalState';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

function Index() {
    const classes = useStyles();
    const [state, dispatch] = useCountContext();
    const [formInput, setFormInput] = useState({});
    const handleFormInput = (event) => {
        const { name, value } = event.target;
        setFormInput({ ...formInput, [name]: value })
    }
    const handleSignup = () => {
        axios.post("http://localhost:8000/rest-auth/registration/", {
            username: formInput.username,
            email: formInput.email,
            password1: formInput.password1,
            password2: formInput.password2
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
    return (
        <div>
            <form >
                <Input value={formInput.username} name="username" onChange={handleFormInput} placeholder="username" />
                <Input value={formInput.email} name="email" onChange={handleFormInput} placeholder="email" />
                <Input value={formInput.password1} name="password1" onChange={handleFormInput} type="password" placeholder="password" />
                <Input value={formInput.password2} name="password2" onChange={handleFormInput} type="password" placeholder="password" />
                <IconButton onClick={handleSignup}>Sign up <ExitToAppIcon /></IconButton>
            </form>
        </div>
    )
}

export default Index
