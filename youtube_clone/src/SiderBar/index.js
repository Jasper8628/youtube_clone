import React from 'react'
import './style.css';
import SidebarRow from '../SidebarRow';
import Home from '@material-ui/icons/Home';
import Trending from '@material-ui/icons/Whatshot';
import Sub from '@material-ui/icons/Subscriptions';
import Library from '@material-ui/icons/VideoLibrary';
function Index() {
    return (
        <div className='sidebar'>
            <br/>
            <br/>
            <br/>
            <br/>
            <SidebarRow Icon={Home} title="Home"/>
            <SidebarRow Icon={Trending} title="Trending"/>
            <SidebarRow Icon={Sub} title="Subscription"/>
            <SidebarRow Icon={Library} title="Library"/>
        </div>

        
    )
}

export default Index
