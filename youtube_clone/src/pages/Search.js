import React from 'react'
import Sidebar from '../components/SiderBar';
import SearchResult from '../components/searchPage';

function Search() {
    return (
        <div className="app__page">
            <Sidebar/>
            <SearchResult/>

        </div>
    )
}

export default Search
