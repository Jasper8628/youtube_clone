import React from 'react';
import './style.css';
import useStyles from '../styles';
import clsx from 'clsx';
import { useCountContext } from "../utils/GlobalState";
import { useEffect } from 'react';
import gapi from 'gapi-client';
import VideoCard from '../videoCard';
function Index() {
    const [state, dispatch] = useCountContext();

    useEffect(() => {
        if (!state.clientLoaded) {
            gapi.load("client:auth2", function () {
                gapi.auth2.init({ client_id: "687867203815-iqtamg9uur9dfrk94u2uaa8hjba6qgic.apps.googleusercontent.com" })
                    .then(() => {
                        dispatch({
                            type: "clientLoaded"
                        });
                        console.log("gapi.load");
                        authenticate().then(loadClient);
                    });
            });
        }
    }, []);
    function authenticate() {
        return gapi.auth2.getAuthInstance()
            .signIn({ scope: "https://www.googleapis.com/auth/youtube.force-ssl" })
            .then(function () { console.log("Sign-in successful"); },
                function (err) { console.error("Error signing in", err); });
    }
    function loadClient() {
        gapi.client.setApiKey("AIzaSyBSrN4egRIz78w3VznDrfS4ivCYuqadNgE");
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
                dispatch({
                    type:"result",
                    result:response.result,
                })
            },
                function (err) { console.error("Execute error", err); });
    }


    const classes = useStyles();
    return (
        <div className={clsx(classes.mainPage, {
            [classes.mainPageShift]: state.status,
        })}>
            <br />
            <br />
            <br />
            <h1>Recommended videos</h1>
            
            {state.hasResult ? (
                    state.result.items.map((item, index) => (
                        <div key={index}>
                            <VideoCard
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
    )
}

export default Index
