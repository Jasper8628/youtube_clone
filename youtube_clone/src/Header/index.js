import React from 'react';
import "./style.css";
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AppsIcon from '@material-ui/icons/Apps';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import NotificationIcon from '@material-ui/icons/Notifications';
import Avatar from '@material-ui/icons/AccountCircle';
//naming: BEM
function Header() {
    return (
        <div className="header">
            <div className="header__left">
                <MenuIcon />
                <img
                    className="header__logo"
                    src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Logo_of_YouTube_%282015-2017%29.svg"
                    alt=""
                />

            </div>
            <div className="header__input">
                <input placeholder="Search" type="text" />
                <SearchIcon className="search__button"/>
            </div>
            <div className="header__right">
                <VideoCallIcon className="header__icon" />
                <AppsIcon className="header__icon" />
                <NotificationIcon className="header__icon" />
                <Avatar />
            </div>



        </div>

    )
}

export default Header
