import React from 'react'
import './style.css';
import useStyles from '../../styles';
import clsx from 'clsx';
import { useCountContext } from "../../utils/GlobalState";
import VideoCard from '../videoCard';
import Filter from '../Filter';
function Index() {
    const classes = useStyles();
    const [state, dispatch] = useCountContext();
    return (
        <div className={clsx(classes.mainPage, {
            [classes.mainPageShift]: state.status,
        })}>
            <br />
            <br />
            <br />
            <div className="searchPage">
                <Filter />
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
            </div>
        </div>
    )
}

export default Index