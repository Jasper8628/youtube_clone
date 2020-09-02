import React from 'react'
import './style.css';
import { Avatar } from '@material-ui/core';
import VerifiedIcon from '@material-ui/icons/CheckCircleOutline';

function Index({ image, channel, verified, subs, noOfVideos, description }) {
    return (
        <div className="channelRow">
            <Avatar className="channelRow__logo" alt={channel} src={image} />
            <div className="channelRow__text">
                <h4>{channel}{verified &&<VerifiedIcon/>} </h4>
                <p>
                    {subs} subscribers . {noOfVideos} videos
                </p>
                <p>
                    {description}
                </p>

            </div>

        </div>
    )
}

export default Index
