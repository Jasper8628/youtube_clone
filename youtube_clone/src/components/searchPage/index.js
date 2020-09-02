import React, { useEffect } from 'react'
import './style.css';
import useStyles from '../../styles';
import clsx from 'clsx';
import { useCountContext } from "../../utils/GlobalState";
import TuneIcon from '@material-ui/icons/Tune';
import ChannelRow from '../../ChannelRow';
import VidewRow from '../../videoRow';
import VideoCard from '../videoCard';
import Filter from '../Filter';
function Index() {

    const classes = useStyles();
    const [state, dispatch] = useCountContext();
    useEffect(() => {


    }, []);

    return (
        <div className={clsx(classes.mainPage, {
            [classes.mainPageShift]: state.status,
        })}>
            <br />
            <br />
            <br />
            <div className="searchPage">
                {/* <div className="searchPage__filter">
                    <TuneIcon />
                    <h2>FILTER</h2>
                </div> */}
                <Filter />
                {/* <hr /> */}
                {state.hasResult ? (
                    state.result.map((item, index) => (
                        <div key={index}>
                            <VideoCard
                                isHome={false}
                                id={item.id.videoId}
                                title={item.snippet.title}
                                description={item.snippet.description}
                                timestamp={item.snippet.publishedAt}
                                channel={item.snippet.channelTitle}
                                image={item.snippet.thumbnails.default.url}
                            />
                        </div>
                    ))
                ) : (<p>nothing to show</p>)}
                {/* <hr /> */}
                {/* <ChannelRow
                image=''
                channel='sample channel' 
                verified='true'
                subs='200'
                noOfVideos='10'
                description='blahblahdddddddddddddddddddddddddddddddddddddddddddddddddddddddd'
                /> */}

            </div>
            {/* <VidewRow /> */}




        </div>
    )
}

export default Index