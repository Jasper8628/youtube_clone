import React from 'react';
import './style.css';
import useStyles from '../../styles';
import clsx from 'clsx';
import { useCountContext } from "../../utils/GlobalState";
import { useEffect } from 'react';
import gapi from 'gapi-client';
import VideoCard from '../videoCard';
function Index() {
    const [state, dispatch] = useCountContext();
    const classes = useStyles();

    useEffect(() => {
        // state.clientLoaded checks if the page has been refreshed, if so, google auth will trigger again
        if (!state.clientLoaded) {
            console.log(process.env.REACT_APP_CLIENT_ID);
            gapi.load("client:auth2", function () {
                gapi.auth2.init({ client_id: process.env.REACT_APP_CLIENT_ID })
                    .then(() => {
                        dispatch({
                            type: "clientLoaded"
                        });
                        console.log("gapi.load");
                        // authenticate().then(loadClient);
                        loadClient();
                    });
            });
        } else { execute() }
    }, []);
    function authenticate() {
        return gapi.auth2.getAuthInstance()
            .signIn({ scope: "https://www.googleapis.com/auth/youtube.force-ssl" })
            .then(function () { console.log("Sign-in successful"); },
                function (err) { console.error("Error signing in", err); });
    }
    function loadClient() {
        gapi.client.setApiKey(process.env.REACT_APP_API_KEY);
        return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
            .then(function () {
                console.log("GAPI client loaded for API");
                dispatch({
                    type: "clientLoaded"
                });
                execute();
            },
                function (err) { console.error("Error loading GAPI client for API", err); });
    }
    // Make sure the client is loaded and sign-in is complete before calling this method.
    function execute() {
        // for demonstration purposes, this function fetches a sample data to prop video components
        return gapi.client.youtube.search.list({
            "part": [
                "snippet"
            ],
            "maxResults": 25,
            "q": "javascript"
        })
            .then(function (response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
                // fetched data is passed to the global state, to be then passed to the video components
                dispatch({
                    type: "result",
                    result: response.result.items,
                })
            },
                function (err) { console.error("Execute error", err); });
    }
    return (
        <div className={clsx(classes.mainPage, {
            [classes.mainPageShift]: state.status,
        })}>
            <br />
            <br />
            <br />
            <h1>Recommended videos</h1>
            <div className="videoContainer" >
                {state.hasResult ? (
                    state.result.map((item, index) => (
                        <div className="vidInnerContainer" key={index}>
                            <VideoCard
                                isHome={true}
                                id={item.id.videoId}
                                title={item.snippet.title}
                                description={item.snippet.description}
                                timestamp={item.snippet.publishedAt}
                                channel={item.snippet.channelTitle}
                                image={item.snippet.thumbnails.medium.url}
                            />
                        </div>
                    ))
                ) : (<p>nothing to show</p>)}
            </div>
        </div>
    )
}

export default Index
