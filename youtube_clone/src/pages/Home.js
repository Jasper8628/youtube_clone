import React from 'react'
import RecommendedVideos from '../components/RecommendedVideos';
import Sidebar from '../components/SiderBar';
function Home() {
    return (
        <div className="app__page">
            <Sidebar/>
            <RecommendedVideos/>
        </div>
        
    )
}

export default Home
